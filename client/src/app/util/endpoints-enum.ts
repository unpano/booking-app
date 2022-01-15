
export enum Endpoint {
  LOGIN = "http://localhost:8084/auth/login",
  SIGNUP = "http://localhost:8084/auth/signup",

  ALL_BOATS = "http://localhost:8084/boats/findAll",
  ALL_COTTAGES = "http://localhost:8084/cottages/findAll",
  ALL_INSTRUCTORS = "http://localhost:8084/instructors/findAll",

  FREE_BOATS = "http://localhost:8084/boats/findFree/",
  FREE_COTTAGES = "http://localhost:8084/cottages/findFree/",
  FREE_ADVENTURES = "http://localhost:8084/adventures/findFree/",


  FIND_INSTRUCTOR = "http://localhost:8084/instructors/findOne",
  FIND_BOAT = "http://localhost:8084/boats/findOne",

  USERS = "http://localhost:8084/users/",
  UPLOAD = "http://localhost:8084/uploads/",
  COTTAGES = "http://localhost:8084/cottages/",



  RESERVATIONS = "http://localhost:8084/reservations/",
  REPORTS = "http://localhost:8084/reports/",
  MAIL = "http://localhost:8084/emails/",
  ROOMS = "http://localhost:8084/rooms/"

}