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
  }, [value]);

  const onChange = (code) => {
    socket.emit("CODE_CHANGE", { roomId, code });
    setValue(code);
  };

  useEffect(() => {
    if (value !== "") {
      socket.emit("SYNC_CODE", { roomId, value });
    }
    socket.on("UPDATE_CODE", (value) => {
      setValue(value);
    });
  }, [users]);

  useEffect(() => {
    setExtension(langSelectedOption.extension);
  }, [langSelectedOption]);

  return (
    <>
      <CodeMirror
        value={value}
        width="100vw"
        height="100vh"
        onChange={onChange}
        extensions={extension}
        theme={themeSelectedOption.theme}
      />
    </>
  );
}

export default CodeEditor;
