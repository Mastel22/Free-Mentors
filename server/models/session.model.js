class Session {
  constructor(mentorId, menteeId, questions, menteeEmail, status = 'pending') {
    this.mentorId = mentorId;
    this.menteeId = menteeId;
    this.questions = questions;
    this.menteeEmail = menteeEmail;
    this.status = status;
  }
}
export default Session;
