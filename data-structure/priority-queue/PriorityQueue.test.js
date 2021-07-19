import { expect } from "@jest/globals";
import PriorityQueue from "./PriorityQueue.mjs";
3;

it("should 1", function () {
  const priority = new PriorityQueue();
  priority.add(10, 1);
  expect(priority.peek()).toBe(10);

  priority.add(5, 2);
  expect(priority.peek()).toBe(10);
});

it("should 2", function () {
  const priority = new PriorityQueue();
  const user1 = { name: "Mike" };
  const user2 = { name: "Bill" };
  const user3 = { name: "Jane" };

  priority.add(user1, 1);
  expect(priority.peek()).toBe(user1);

  priority.add(user2, 2);
  expect(priority.peek()).toBe(user1);

  priority.add(user3, 0);
  expect(priority.peek()).toBe(user3);
});

it("should 3", function () {
  const priority = new PriorityQueue();

  priority.add(10, 1);
  priority.add(5, 2);
  priority.add(100, 0);
  priority.add(200, 0);

  expect(priority.poll()).toBe(100);
  expect(priority.poll()).toBe(200);
  expect(priority.poll()).toBe(10);
  expect(priority.poll()).toBe(5);
});

it("should 4", function () {
  const priority = new PriorityQueue();
  priority.add(10, 1);
  priority.add(5, 2);
  priority.add(100, 0);
  priority.add(200, 0);

  console.log(priority.toString());

  priority.changePriority(100, 10);

  expect(priority.poll()).toBe(200);
  expect(priority.poll()).toBe(10);
  expect(priority.poll()).toBe(5);
  expect(priority.poll()).toBe(100);

  console.log(priority.toString());
  // expect(priority.poll()).toBe(100);
});
