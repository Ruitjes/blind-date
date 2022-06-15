import { Question } from "./Question";
import { ReportedContent } from "./ReportedContent";
import { UserReportDto } from "./UserReportDto";

export class Report {
  constructor(
    public id: string,
    public reporter: UserReportDto,
    public reported: UserReportDto,
    public reportedContent: ReportedContent,
    public question: Question,
    public createdAt: string,
    public status: string) {
  }
}
