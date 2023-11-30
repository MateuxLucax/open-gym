import { defaultActivities } from './activity';
import { EnrollmentActivity } from './enrollmentActivity';
import { Member, defaultMembers } from './member';

export type Enrollment = {
  id: number;
  member: Member;
  activities: EnrollmentActivity[];
  startDate: Date;
  endDate: Date;
  discount: number;
};

export const defaultEnrollments: Enrollment[] = [
  {
    id: 1,
    member: defaultMembers[0],
    activities: [
      {
        id: 1,
        enrollmentId: 1,
        activity: defaultActivities[0],
        start: '18:00',
        end: '19:00'
      }
    ],
    startDate: new Date(2023, 0, 1),
    endDate: new Date(2023, 11, 31),
    discount: 0.05
  }
];
