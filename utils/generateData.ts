import { UserData } from '../pages/SignupPage';

export function generateRamdonUserData() {
    const randomNumber = Date.now();
    const dinamycEmail = `graciela.carmen+${randomNumber}@gmail.com`;
    const dinamycName = `Graciela ${randomNumber}`;

    const userDetails: UserData = {
        title: 'Mrs',
        password: 'Example123!',
        day: '10',
        month: '5',
        year: '1990',
        firstName: 'Graciela',
        lastName: 'Gallas',
        company: 'QA Corp',
        address: 'Main Street 123',
        address2: 'Apt 4B',
        country: 'India',
        state: 'StateName',
        city: 'CityName',
        zipcode: '12345',
        mobileNumber: '1234567890'
    };

    return {
        email: dinamycEmail,
        name: dinamycName,
        userDetails: userDetails
    };
}