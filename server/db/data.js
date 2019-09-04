import User from '../models/user.model';
import Session from '../models/session.model';

export const users = [
  new User(1, 'Pierrette', 'Mastel', 'pmastel82@gmail.com', '$2b$10$t1F0QNy0WuM00BQiJmPApulsLAnWBm4DYNo3f/JOHr44Vn5zXyZ7m', 'KK 183', '5years of web developments', 'Web Developer', '3years developing apps', 'admin'),
  new User(2, 'Jean Luc', 'MASTER', 'master@gmail.com', '$2b$10$XtkjKPRXPMoAGzoUFlvSIOeQlxw3XCF6HoQHIVo0e.AolkXlvr/QG', 'KK 183', '5years of web developments', 'Web Developer', '3years developing apps', 'mentor'),
  
];

export const sessions = [
  new Session(1, 2, 2, 'Would you be my mentor', 'pmastel82@gmail.com'),
];
