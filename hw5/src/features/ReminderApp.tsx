import React from "react";
import ReminderForm from "./ReminderForm";
import ReminderList from "./ReminderList";
import Dashboard from "./Dashboard";
import "./reminder.scss";

export default function ReminderApp(): JSX.Element {
  return (
    <div className="wrapper">
      <h1 className="title">Напомняния в облака</h1>
      <ReminderForm />
      <ReminderList />
      <Dashboard />
    </div>
  );
}
