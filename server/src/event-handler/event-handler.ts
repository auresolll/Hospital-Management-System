import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventConstants } from 'src/constants/enums';

@Injectable()
export class EventHandlers {
    // constructor(private readonly reportService: ReportService) {}
    // @OnEvent(EventConstants.CACHING_REPORT)
    // async handleCachingReports() {
    //     await this.reportService.cachingReports();
    // }
    // @OnEvent(EventConstants.CACHING_USER_REPORT)
    // async handleCachingUserReports() {
    //     await this.reportService.cachingUserReports();
    // }
}
