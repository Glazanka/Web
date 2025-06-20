import React, { useEffect, useRef } from "react";
import api from "../api";

interface UpcomingReminder {
  id: string;
  noteId: string;
  remindAt: string;
  sent: boolean;
}

export default function Dashboard(): null {
  const intervalRef = useRef<number | undefined>(undefined);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("No userId in localStorage");
      return;
    }

    const checkReminders = () => {
      api
        .get<UpcomingReminder[]>(`/api/reminders/upcoming?userId=${userId}`)
        .then((res) => {
          const now = new Date();
          res.data.forEach((reminder) => {
            const remindTime = new Date(reminder.remindAt);
            if (!reminder.sent && remindTime <= now) {
              if (Notification.permission === "granted") {
                new Notification("Reminder", {
                  body: `Time to review note #${reminder.noteId}`,
                });
              }

              api
                .put(`/api/reminders/${reminder.id}/markSent?userId=${userId}`)
                .catch((err) => console.error("Error marking as sent:", err));
            }
          });
        })
        .catch((err) => console.error("Error fetching upcoming reminders:", err));
    };

    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.warn("User denied notifications.");
        }
      });
    }

    checkReminders();
    intervalRef.current = window.setInterval(checkReminders, 60000);

    return () => {
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
      }
    };
  }, [userId]);

  return null;
}
