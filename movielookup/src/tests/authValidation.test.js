import { describe, test, expect } from 'vitest';
import {
    validateUsername,
    validatePassword,
    validateRegistration,
} from '../utils/authValidation.js';

describe('TestValidateUsername', () => {
    test('throws when username is empty after trimming', () => {
        expect(() => validateUsername('   ')).toThrow('Please enter a username.');
    });

    test('throws when username is shorter than 5 characters', () => {
        expect(() => validateUsername('abcd')).toThrow(
            'Username must be 5-14 characters and can only contain letters, numbers, and underscores.'
        );
    });

    test('throws when username is longer than 14 characters', () => {
        expect(() => validateUsername('averyverylongname')).toThrow(
            'Username must be 5-14 characters and can only contain letters, numbers, and underscores.'
        );
    });

    test('throws when username contains invalid special characters', () => {
        expect(() => validateUsername('bad$name')).toThrow(
            'Username must be 5-14 characters and can only contain letters, numbers, and underscores.'
        );
    });

    test('allows underscores', () => {
        expect(validateUsername('misha_12')).toBe('misha_12');
    });

    test('trims valid usernames', () => {
        expect(validateUsername('  misha_12  ')).toBe('misha_12');
    });
});

describe('TestValidatePassword', () => {
    test('throws when passwords do not match', () => {
        expect(() => validatePassword('Password1!', 'Password2!')).toThrow(
            'Passwords do not match.'
        );
    });

    test('throws when password is too short', () => {
        expect(() => validatePassword('P1!abc', 'P1!abc')).toThrow(
            'Password must be at least 8 characters and include at least one capital letter, one number, and one special character.'
        );
    });

    test('throws when password has no capital letter', () => {
        expect(() => validatePassword('password1!', 'password1!')).toThrow(
            'Password must be at least 8 characters and include at least one capital letter, one number, and one special character.'
        );
    });

    test('throws when password has no number', () => {
        expect(() => validatePassword('Password!', 'Password!')).toThrow(
            'Password must be at least 8 characters and include at least one capital letter, one number, and one special character.'
        );
    });

    test('throws when password has no special character', () => {
        expect(() => validatePassword('Password1', 'Password1')).toThrow(
            'Password must be at least 8 characters and include at least one capital letter, one number, and one special character.'
        );
    });

    test('accepts a valid password', () => {
        expect(validatePassword('Password1!', 'Password1!')).toBe('Password1!');
    });
});

describe('TestValidateRegistration', () => {
    test('returns cleaned registration data when valid', () => {
        expect(
            validateRegistration({
                username: '  misha_12  ',
                password: 'Password1!',
                confirmPassword: 'Password1!',
            })
        ).toEqual({
            username: 'misha_12',
            password: 'Password1!',
        });
    });

    test('throws username error first when username is invalid', () => {
        expect(() =>
            validateRegistration({
                username: 'ab!',
                password: 'Password1!',
                confirmPassword: 'Password1!',
            })
        ).toThrow(
            'Username must be 5-14 characters and can only contain letters, numbers, and underscores.'
        );
    });
});