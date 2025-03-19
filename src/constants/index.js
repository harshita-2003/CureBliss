import { records, user, screening, apps} from '../assets';

export const navLinks = [
    {
        name : 'dashboard',
        imageUrl : apps,
        link : '/'
    },
    {
        name : 'records',
        imageUrl : records,
        link : '/medical-records'
    },
    {
        name : 'screening',
        imageUrl : screening,
        link : '/onboarding'
    },
    {
        name : 'profile',
        imageUrl : user,
        link : '/profile'
    }
]