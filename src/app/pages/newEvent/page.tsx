"use client";
import Navbar from "../../components/navbar";
import { PageLoading } from "../../components/pageLoading";
import { NewEvent } from "../../components/newEvent";

export default function newEvent() {
  return (
    <>
      <Navbar/>
      <NewEvent/>
    </>
  );
}
