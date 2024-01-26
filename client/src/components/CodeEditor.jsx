import CodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";

function CodeEditor({
  socket,
  roomId,
  langSelectedOption,
  themeSelectedOption,
  users,
}) {
  const [value, setValue] = useState("");
  const [extension, setExtension] = useState(null);

  useEffect(() => {
    socket.on("CODE_CHANGE", ({ code }) => {
      setValue(code);
    });
    socket.on("UPDATE_CODE", (value) => {
      setValue(value);
    });
  }, []);

  const onChange = (code) => {
    socket.emit("CODE_CHANGE", {
      roomId,
      code,
      username: localStorage.getItem("username"),
    });
    setValue(code);
  };

  useEffect(() => {
    if (value !== "") {
      socket.emit("SYNC_CODE", { roomId, value });
    }
  }, [users]);

  useEffect(() => {
    setExtension(langSelectedOption.extension);
  }, [langSelectedOption]);

  return (
    <CodeMirror
      value={value}
      maxWidth="100vw"
      minWidth="100vw"
      maxHeight="100vh"
      minHeight="100vh"
      onChange={onChange}
      extensions={extension}
      theme={themeSelectedOption.theme}
    />
  );
}

export default CodeEditor;
