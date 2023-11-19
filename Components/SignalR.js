"use client";
import React, { useState, useEffect } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import SuccesToast from "./SharedUI/Toast/SuccesToast";

export default function SignalR() {
  const [HubConnection, setHubConnetion] = useState();
  const [signalRalert, setSignalRalert] = useState();

  useEffect(() => {
    createConnection();
  }, []);

  const createConnection = async () => {
    const handeleConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5031/product-hub")
      .build();
    try {
      await handeleConnection.start();
      console.log("SignalR'a Bağlandı");
      setHubConnetion(handeleConnection);
    } catch (error) {
      console.log("SignalR Error : ",error);
    }
  };

  useEffect(() => {
    if (HubConnection) {
      HubConnection.on("receiveProductAddedMessage", (e) => {
        SuccesToast(e);
      });
    }
  }, [HubConnection]);

  return <div className="hidden"></div>;
}
