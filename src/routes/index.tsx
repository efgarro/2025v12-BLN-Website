// src/routes/index.tsx
import * as fs from "node:fs";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import { get } from "node:http";

import "../css/styles.css";
import styles from "../css/footer.module.css";

interface Todo {
  userID: number;
  id: number;
  title: string;
  completed: boolean;
}

const getTodo = createServerFn({
  method: "GET",
}).handler(async () => {
  const res = await axios("https://jsonplaceholder.typicode.com/todos/11");
  return res.data;
});

// const getUser = createServerFn({
//   method: "GET",
// }).handler(async () => {
//   const res = await axios("https://api.github.com/users/efgarro");
//   return res.data;
// });

export const getServerTime = createServerFn({ method: "GET" }).handler(
  async () => {
    return new Date().toISOString();
  }
);

export const getServerData = createServerFn({ method: "GET" }).handler(
  async () => {
    return {
      message: "Hello, World!",
    };
  }
);

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getTodo(),
});

function Home() {
  const data = Route.useLoaderData();
  console.log(data);
  return (
    <>
      <p className="bg-red-500 text-white p-4">Hellow {data.title}</p>
      <h2>BijaLapa</h2>
      <footer className={`${styles.footer_box}`}>Footer</footer>
    </>
  );
}
