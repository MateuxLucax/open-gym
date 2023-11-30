import { Activity } from './activity';

export type EnrollmentActivity = {
  id: number;
  enrollmentId: number;
  activity: Activity;
  start: string;
  end: string;
};
