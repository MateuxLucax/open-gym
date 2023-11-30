import { monthDiff } from '../utils';
import { Enrollment, defaultEnrollments } from './enrollment';

export type MonthlyFee = {
  id: number;
  enrollment: Enrollment;
  status: PaymentStatus;
  price: number;
  dueDate: Date;
  interest: number;
};

export enum PaymentStatus {
  paid = 'Pago',
  pending = 'Pendente',
  overdue = 'Atrasado'
}

export const statusColor = {
  [PaymentStatus.paid]: 'green',
  [PaymentStatus.pending]: 'blue',
  [PaymentStatus.overdue]: 'red'
};

export const nextStatus = {
  [PaymentStatus.paid]: PaymentStatus.pending,
  [PaymentStatus.pending]: PaymentStatus.overdue,
  [PaymentStatus.overdue]: PaymentStatus.paid
};

export function generateFees(enrollment: Enrollment): MonthlyFee[] {
  const fees = <MonthlyFee[]>[];

  const monthsToGenerate = Math.max(
    Math.abs(monthDiff(enrollment.startDate, enrollment.endDate)) + 1,
    1
  );

  for (let i = 0; i < monthsToGenerate; i++) {
    const dueDate = new Date(enrollment.startDate);
    dueDate.setMonth(dueDate.getMonth() + i);
    const price = enrollment.activities.reduce(
      (acc, activity) => acc + activity.activity.price,
      0
    );

    let status = PaymentStatus.pending;
    if (dueDate < new Date()) {
      status = PaymentStatus.paid;
    }

    fees.push({
      id: i + 1,
      enrollment,
      status,
      price: price,
      dueDate,
      interest: 0.0576
    });
  }

  return fees;
}

export const defaultMonthlyFees: MonthlyFee[] = [
  ...generateFees(defaultEnrollments[0]),
  ...generateFees(defaultEnrollments[1])
];
