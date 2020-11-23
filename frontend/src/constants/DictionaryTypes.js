import { EMPLOYMENT, SCHEDULE, SALARY, SCOPE, EXPERIENCE, EDUCATION, DIRECTION, SKILL } from "../constants/ActionTypes";

export const getDictionaryType = (dictType) => {
    switch (dictType) {
        case 'employment':
            return EMPLOYMENT
        case 'schedule':
            return SCHEDULE
        case 'salary':
            return SALARY
        case 'scope':
            return SCOPE
        case 'experience':
            return EXPERIENCE
        case 'education':
            return EDUCATION
        case 'direction':
            return DIRECTION
        case 'skills':
            return SKILL
        default:
            return []
    }
}
