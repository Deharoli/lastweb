import { A } from "@solidjs/router";
import { Component } from "solid-js";
import LandingPage from "~/components/LandingPage/LandingPage";

export default function Home() {
  console.log("Home page loaded");
  return <LandingPage />;
}
