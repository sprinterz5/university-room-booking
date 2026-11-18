import assert from 'node:assert/strict';
import test from 'node:test';
import { createFirstPassData } from '../server/db/seed/firstPass.js';

test('first-pass data links the booking to a room, user and scoped admin', () => {
  const data = createFirstPassData(new Date('2026-11-18T00:00:00Z'));
  const booking = data.bookings[0];
  const room = data.rooms.find(({ id }) => id === booking.roomId);
  const user = data.users.find(({ id }) => id === booking.userId);
  const admin = data.users.find(({ id }) => id === 'user-admin-b');

  assert.equal(data.buildings.length, 2);
  assert.equal(booking.id, 'b-101');
  assert.equal(booking.date, '2026-11-19');
  assert.equal(booking.startMin, 840);
  assert.equal(booking.endMin, 900);
  assert.equal(room.name, 'B204');
  assert.equal(room.buildingName, 'Building B');
  assert.equal(room.campusName, 'Main Campus');
  assert.equal(room.type, 'Meeting room');
  assert.equal(user.role, 'student');
  assert.equal(admin.role, 'room_admin');
  assert.ok(data.roomAdminScopes.some(
    ({ userId, buildingId }) => userId === admin.id && buildingId === room.buildingId,
  ));
});

test('the fixture date follows campus time near a UTC day boundary', () => {
  const data = createFirstPassData(new Date('2026-11-18T20:00:00Z'));
  assert.equal(data.bookings[0].date, '2026-11-20');
});
