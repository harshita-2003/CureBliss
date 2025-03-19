import { records, user, screening, apps} from '../assets';

export const navLinks = [
    {
        name : 'dashboard',
        imageUrl : apps,
        link : '/dashboard'
    },
    {
        name : 'medical-records',
        imageUrl : records,
        link : '/medical-records'
    },
    {
        name : 'onboarding',
        imageUrl : screening,
        link : '/onboarding'
    },
    {
        name : 'profile',
        imageUrl : user,
        link : '/profile'
    }
]