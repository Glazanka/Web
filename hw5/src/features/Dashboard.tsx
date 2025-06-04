// src/features/Dashboard.tsx
import React, { useEffect, useRef } from "react";
import api from "../api";

interface UpcomingReminder {
  id: string;
  text: string;
  remindAt: string;
  isSent: boolean;
}

export default function Dashboard(): null {
  // Инициализираме ref-а с undefined
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const checkReminders = () => {
      api
        .get<UpcomingReminder[]>("/reminders/upcoming")
        .then((res) => {
          const now = Date.now();
          res.data.forEach((r) => {
            const remindTime = new Date(r.remindAt).getTime();
            if (remindTime <= now && !r.isSent) {
              if ("Notification" in window && Notification.permission === "granted") {
                new Notification("Напомняне", { body: r.text });
              } else {
                alert(`Напомняне: ${r.text}`);
              }
              api
                .put(`/reminders/${r.id}/markSent`)
                .catch((err) => console.error("Грешка при markSent:", err));
            }
          });
        })
        .catch((err) => {
          console.error("Грешка при polling:", err);
        });
    };

    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    checkReminders();
    intervalRef.current = window.setInterval(checkReminders, 60000);

    return () => {
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return null;
}
