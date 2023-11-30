'use client';

import { ptBR } from 'date-fns/locale';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
  Badge,
  BadgeDelta,
  Button,
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  Grid,
  List,
  ListItem,
  Metric,
  NumberInput,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextInput,
  Title
} from '@tremor/react';
import DateRange from '../../components/dateRange';
import HeaderTitle from '../../components/headerTitle';
import { formatDate, formatMoney, monthDiff } from '../../utils';
import { useState } from 'react';
import { Enrollment, defaultEnrollments } from '../../models/enrollment';
import {
  MonthlyFee,
  PaymentStatus,
  defaultMonthlyFees,
  generateFees,
  nextStatus,
  statusColor
} from '../../models/monthlyFee';
import { Member, defaultMembers } from '../../models/member';
import { Activity, defaultActivities } from '../../models/activity';
import { EnrollmentActivity } from '../../models/enrollmentActivity';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] =
    useState<Enrollment[]>(defaultEnrollments);
  const [monthlyFees, setMonthlyFees] =
    useState<MonthlyFee[]>(defaultMonthlyFees);
  const [member, setMember] = useState<Member | undefined>();
  const [date, setDate] = useState<DateRangePickerValue>({
    from: new Date(),
    to: new Date(2024, 1, 1)
  });
  const [activities, setActivities] = useState<EnrollmentActivity[]>([]);
  const [activity, setActivity] = useState<Activity>();
  const [periodStart, setPeriodStart] = useState<string>('');
  const [periodEnd, setPeriodEnd] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);

  function getMonthlyFees(enrollment: Enrollment): MonthlyFee[] {
    return monthlyFees.filter(
      (monthlyFee) => monthlyFee.enrollment.id === enrollment.id
    );
  }

  function handleAddEnrollment() {
    debugger;
    if (!member || !date.from || !date.to) {
      return;
    }

    const enrollment: Enrollment = {
      id: enrollments.length + 1,
      member,
      startDate: date.from,
      endDate: date.to,
      activities,
      discount
    };

    const fees = generateFees(enrollment);
    debugger;
    setEnrollments([...enrollments, enrollment]);
    setMonthlyFees([...monthlyFees, ...fees]);
    setMember(undefined);
    setDate({ from: new Date(), to: new Date(2024, 1, 1) });
    setActivities([]);
    setActivity(undefined);
    setPeriodStart('');
    setPeriodEnd('');
    setDiscount(0);
  }

  const thisMonth = new Date().getMonth();
  const thisMonthFees = monthlyFees.filter(
    (monthlyFee) => monthlyFee.dueDate.getMonth() === thisMonth
  );
  const paidMonthlyFees = thisMonthFees.filter(
    (monthlyFee) => monthlyFee.status === PaymentStatus.paid
  );

  function updateMonthlyFee(monthlyFee?: MonthlyFee) {
    if (!monthlyFee) return;

    const index = monthlyFees.findIndex((mf) => mf.id === monthlyFee?.id);
    monthlyFees[index] = monthlyFee;
    setMonthlyFees([...monthlyFees]);
  }

  const thisMonthTotal = paidMonthlyFees.reduce(
    (acc, monthlyFee) =>
      acc +
      (monthlyFee.price - monthlyFee.price * monthlyFee.enrollment.discount),
    0
  );

  const enrolledMembers = enrollments.map((enrollment) => enrollment.member);
  const availableMembers = defaultMembers.filter(
    (member) => !enrolledMembers.includes(member)
  );
  const availableActivities = defaultActivities.filter(
    (activity) =>
      !activities.map((activity) => activity.activity).includes(activity)
  );
  const totalValueNewEnrollment = activities.reduce(
    (acc, activity) => acc + activity.activity.price,
    0
  );
  const discountedValueNewEnrollment =
    totalValueNewEnrollment - totalValueNewEnrollment * discount;

  return (
    <>
      <section className="flex flex-row justify-between items-center gap-4 mb-8">
        <HeaderTitle>Matrículas</HeaderTitle>
        <DateRange />
      </section>
      <Grid numItems={2} className="gap-6 mb-6">
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Total no período</Text>
              <Metric>{formatMoney(thisMonthTotal)}</Metric>
            </div>
            <BadgeDelta deltaType="moderateIncrease">
              {((thisMonthTotal - 100) / 100) * 100}%
            </BadgeDelta>
          </Flex>
        </Card>
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Total de matrículas</Text>
              <Metric>{enrolledMembers.length}</Metric>
            </div>
            <BadgeDelta deltaType="unchanged">10%</BadgeDelta>
          </Flex>
        </Card>
      </Grid>
      <Accordion className="mb-6">
        <AccordionHeader className="text-xl font-bold">
          Nova matrícula
        </AccordionHeader>
        <AccordionBody className="flex flex-col gap-4">
          <div className="flex justify-start items-center gap-4">
            <Title>Membro</Title>
            <Select
              className="w-48"
              placeholder="Membro..."
              value={String(member?.id)}
              onValueChange={(value) => {
                const member = availableMembers.find(
                  (member) => member.id === Number(value)
                );
                if (!member) {
                  return;
                }
                setMember(member);
              }}
            >
              {availableMembers.map((member) => (
                <SelectItem key={member.id} value={String(member.id)}>
                  {member.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex justify-start items-center gap-4">
            <Title>Período da matrícula</Title>
            <DateRangePicker
              value={date}
              onValueChange={setDate}
              locale={ptBR}
              placeholder="Selecione o período"
              selectPlaceholder="Selecionar"
              color="rose"
              enableSelect={false}
            ></DateRangePicker>
          </div>
          <div>
            <Title>Atividades</Title>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Nome</TableHeaderCell>
                  <TableHeaderCell>Equipamento</TableHeaderCell>
                  <TableHeaderCell>Instrutor</TableHeaderCell>
                  <TableHeaderCell></TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.activity.name}</TableCell>
                    <TableCell>{activity.activity.equipment.name}</TableCell>
                    <TableCell>{activity.activity.instructor.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="light"
                        icon={TrashIcon}
                        color="red"
                        tooltip="Remover"
                        onClick={() => {
                          const index = activities.findIndex(
                            (act) => act.id === activity.id
                          );
                          activities.splice(index, 1);
                          setActivities([...activities]);
                        }}
                      >
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <Select
                      placeholder="Atividade..."
                      value={String(activity?.id)}
                      onValueChange={(value) => {
                        const activity = availableActivities.find(
                          (activity) => activity.id === Number(value)
                        );
                        if (!activity) {
                          return;
                        }
                        setActivity(activity);
                      }}
                    >
                      {availableActivities.map((activity) => (
                        <SelectItem
                          key={activity.id}
                          value={String(activity.id)}
                        >
                          {activity.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextInput
                      placeholder="Inicio..."
                      value={periodStart}
                      onValueChange={setPeriodStart}
                    />
                  </TableCell>
                  <TableCell>
                    <TextInput
                      placeholder="Fim..."
                      value={periodEnd}
                      onValueChange={setPeriodEnd}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="secondary"
                      color="blue"
                      onClick={() => {
                        if (!activity || !periodStart || !periodEnd) {
                          return;
                        }
                        const enrollmentActivity: EnrollmentActivity = {
                          id: activities.length + 1,
                          activity,
                          start: periodStart,
                          end: periodEnd,
                          enrollmentId: enrollments.length + 1
                        };
                        setActivities([...activities, enrollmentActivity]);
                      }}
                    >
                      Adicionar
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-start items-center gap-4">
            <Title>Desconto</Title>
            <NumberInput
              className="w-48"
              value={discount}
              onValueChange={(value) => setDiscount(value / 100)}
              placeholder="Desconto..."
            />
          </div>
          <div className="flex justify-end items-center gap-4">
            <Title>Valor total</Title>
            <Metric>{formatMoney(discountedValueNewEnrollment)}</Metric>
            <Button
              variant="secondary"
              color="blue"
              icon={PlusIcon}
              onClick={handleAddEnrollment}
            >
              Adicionar
            </Button>
          </div>
        </AccordionBody>
      </Accordion>
      <Grid className="gap-6" numItemsSm={1} numItemsMd={2}>
        {enrollments.map((enrollment) => {
          const monthlyFees = getMonthlyFees(enrollment);

          const currentMonthlyFee = monthlyFees.find(
            (monthlyFee) => monthlyFee.dueDate.getMonth() === thisMonth
          );
          const status = currentMonthlyFee?.status;
          const color = statusColor[status || PaymentStatus.pending];
          const discountedPrice =
            monthlyFees[0].price - monthlyFees[0].price * enrollment.discount;
          console.log(
            'discountedPrice',
            discountedPrice,
            monthlyFees[0].price,
            enrollment.discount
          );

          return (
            <Card key={enrollment.id} className="max-h-96 overflow-scroll">
              <Flex>
                <Title>{enrollment.member.name}</Title>
                <Badge
                  className="cursor-pointer select-none"
                  color={color}
                  onClick={() => {
                    if (!currentMonthlyFee) return;
                    const newStatus = nextStatus[currentMonthlyFee.status];
                    currentMonthlyFee.status = newStatus;
                    updateMonthlyFee(currentMonthlyFee);
                  }}
                >
                  {status}
                </Badge>
              </Flex>
              <div className="flex flex-col my-4">
                <Text>Valor da mensalidade</Text>
                <Metric>{formatMoney(discountedPrice)}</Metric>
              </div>
              <AccordionList className="w-full mx-auto">
                <Accordion>
                  <AccordionHeader>Mensalidades</AccordionHeader>
                  <AccordionBody>
                    <Table className="w-full">
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell className="text-left">
                            Data
                          </TableHeaderCell>
                          <TableHeaderCell className="text-right">
                            Valor
                          </TableHeaderCell>
                          <TableHeaderCell className="text-right">
                            Situação
                          </TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {monthlyFees.map((monthlyFee) => {
                          let price = monthlyFee.price;

                          if (monthlyFee.status === PaymentStatus.overdue) {
                            for (
                              let i = 0;
                              i <
                              Math.max(
                                Math.abs(
                                  monthDiff(new Date(), monthlyFee.dueDate)
                                ) + 1,
                                1
                              );
                              i++
                            ) {
                              const calc = price * monthlyFee.interest;
                              price += calc;
                            }
                          }

                          return (
                            <TableRow key={monthlyFee.id}>
                              <TableCell className="text-left">
                                {formatDate(monthlyFee.dueDate)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatMoney(price)}
                              </TableCell>
                              <TableCell className="text-right">
                                <Badge
                                  className="cursor-pointer select-none"
                                  onClick={() => {
                                    let newStatus =
                                      nextStatus[monthlyFee.status];

                                    if (
                                      monthlyFee.dueDate < new Date() &&
                                      newStatus === PaymentStatus.pending
                                    ) {
                                      newStatus = PaymentStatus.overdue;
                                    } else if (
                                      monthlyFee.dueDate >= new Date() &&
                                      newStatus === PaymentStatus.overdue
                                    ) {
                                      newStatus = PaymentStatus.paid;
                                    }
                                    monthlyFee.status = newStatus;
                                    updateMonthlyFee(monthlyFee);
                                  }}
                                  color={
                                    statusColor[
                                      monthlyFee.status || PaymentStatus.pending
                                    ]
                                  }
                                >
                                  {monthlyFee.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </AccordionBody>
                </Accordion>
                <Accordion>
                  <AccordionHeader>Atividades</AccordionHeader>
                  <AccordionBody>
                    <Table className="w-full">
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell className="text-left">
                            Nome
                          </TableHeaderCell>
                          <TableHeaderCell className="text-right">
                            Equipamento
                          </TableHeaderCell>
                          <TableHeaderCell className="text-right">
                            Instrutor
                          </TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {enrollment.activities.map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell className="text-left">
                              {activity.activity.name}
                            </TableCell>
                            <TableCell className="text-right">
                              {activity.activity.equipment.name}
                            </TableCell>
                            <TableCell className="text-right">
                              {activity.activity.instructor.name}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionBody>
                </Accordion>
              </AccordionList>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}
