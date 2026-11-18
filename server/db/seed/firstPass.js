const campusTime = new Intl.DateTimeFormat('en', {
  timeZone: 'Asia/Almaty',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function nextCampusDate(now) {
  const parts = Object.fromEntries(
    campusTime.formatToParts(now).map(({ type, value }) => [type, value]),
  );
  const nextDay = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day) + 1,
  );
  return new Date(nextDay).toISOString().slice(0, 10);
}

export function createFirstPassData(now = new Date()) {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) {
    throw new TypeError('now must be a valid Date');
  }

  const date = nextCampusDate(now);

  return {
    campuses: [
      { id: 'campus-main', name: 'Main Campus' },
    ],
    buildings: [
      { id: 'building-b', campusId: 'campus-main', name: 'Building B' },
      { id: 'building-c', campusId: 'campus-main', name: 'Building C' },
    ],
    roomTypes: [
      { id: 'type-meeting', name: 'Meeting room', requiresApproval: true },
      { id: 'type-study', name: 'Study room', requiresApproval: false },
    ],
    rooms: [
      {
        id: 'room-b204',
        name: 'B204',
        buildingId: 'building-b',
        buildingName: 'Building B',
        campusId: 'campus-main',
        campusName: 'Main Campus',
        roomTypeId: 'type-meeting',
        type: 'Meeting room',
        capacity: 8,
        bookableBy: 'student',
        equipment: [{ id: 'equipment-whiteboard', name: 'Whiteboard' }],
      },
      {
        id: 'room-c101',
        name: 'C101',
        buildingId: 'building-c',
        buildingName: 'Building C',
        campusId: 'campus-main',
        campusName: 'Main Campus',
        roomTypeId: 'type-study',
        type: 'Study room',
        capacity: 6,
        bookableBy: 'student',
        equipment: [{ id: 'equipment-projector', name: 'Projector' }],
      },
    ],
    users: [
      { id: 'user-student-1', displayName: 'Test Student', role: 'student' },
      { id: 'user-admin-b', displayName: 'Test Room Admin', role: 'room_admin' },
    ],
    roomAdminScopes: [
      { userId: 'user-admin-b', buildingId: 'building-b' },
    ],
    bookings: [
      {
        id: 'b-101',
        roomId: 'room-b204',
        userId: 'user-student-1',
        date,
        startMin: 840,
        endMin: 900,
        status: 'requested',
      },
    ],
  };
}
