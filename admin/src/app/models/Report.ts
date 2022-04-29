import { Question } from "./Question";
import { UserReportDto } from "./UserReportDto";

export class Report {
  constructor(
    public id: string,
    public reporter: UserReportDto,
    public reported: UserReportDto,
    public reportedContent: string,
    public question: Question,
    public createdAt: string,
    public status: string) {
  }
}
