import User from '../models/user.model';
import Session from '../models/session.model';

export const users = [
  new User(1, 'Pierrette', 'Mastel', 'pmastel82@gmail.com', '$2b$10$t1F0QNy0WuM00BQiJmPApulsLAnWBm4DYNo3f/JOHr44Vn5zXyZ7m', 'KK 183', '5years of web developments', 'Web Developer', '3years developing apps', 'admin'),
  new User(2, 'Jean Luc', 'MASTER', 'master@gmail.com', '$2b$10$t1F0QNy0WuM00BQiJmPApulsLAnWBm4DYNo3f/JOHr44Vn5zXyZ7m', 'KK 183', '5years of web developments', 'Web Developer', '3years developing apps', 'mentor'),
]; // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBtYXN0ZWw4MkBnbWFpbC5jb20iLCJpYXQiOjE1NjczNTQ1MjB9.VmHo51vWcNY3jTB3GQCwLKDMqRSROSKJNjAQcwblCJQ

export const sessions = [
  new Session(1, 2, 2, 'Would you be my mentor', 'pmastel82@gmail.com'),
];
