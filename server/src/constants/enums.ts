export enum Status {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
}

// export enum PatientType {
//     CHECKUP = 'CHECKUP',
//     REEXAMINATION = 'RE-EXAMINATION',
//     EMERGENCY = 'EMERGENCY',
//     SURGICAL = 'SURGICAL',
// }

export enum PatientTest {
    CHECKUP = 'CHECKUP',
    RE_EXAMINATION = 'RE_EXAMINATION',
}

export enum RoomType {
    EMERGENCY = 'EMERGENCY',
    CONSULTING_ROOM = 'CONSULTING_ROOM',
    DAY_ROOM = 'DAY_ROOM',
    DELIVERY_ROOM = 'DELIVERY_ROOM',
    DEPENSARY = 'DEPENSARY',
    PHARMACY = 'PHARMACY',
    OPERATING_ROOM = 'OPERATING_ROOM',
}

export enum ReportType {
    COMPLETED = 'COMPLETED',
    UNCOMPLETED = 'UNCOMPLETED',
    LATE = 'LATE',
}

export enum CompletionType {
    COMPLETED = 'COMPLETED',
    UNCOMPLETED = 'UNCOMPLETED',
}

export enum UserType {
    OPERATOR = 'Nhân viên',
    DOCTOR = 'Bác sĩ',
    PATIENT = 'Bệnh nhân',
    HEAD_DEPARTMENT = 'Trưởng khoa',
    ADMIN = 'ADMIN',
}

export enum EventConstants {
    CACHING_REPORT = 'CACHING_REPORT',
    CACHING_USER_REPORT = 'CACHING_USER_REPORT',
}

export enum TypeAchievement {
    DAY = 'DAY',
    MONTH = 'MONTH',
    YEAR = 'YEAR',
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    THIRD = 'THIRD',
}
