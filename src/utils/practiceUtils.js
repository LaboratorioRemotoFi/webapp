export const logScheduleAction = (scheduleId, message) => {
  return fetch(`/api/schedules/${scheduleId}/log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ message }),
  });
};

export const updateSchedule = (scheduleId, data) => {
  return fetch(`/api/schedules/${scheduleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};
