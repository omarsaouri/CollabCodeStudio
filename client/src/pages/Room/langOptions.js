import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { json } from "@codemirror/lang-json";
import { lezer } from "@codemirror/lang-lezer";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { sql } from "@codemirror/lang-sql";
import { xml } from "@codemirror/lang-xml";
import { less } from "@codemirror/lang-less";
import { sass } from "@codemirror/lang-sass";
import { css } from "@codemirror/lang-css";
import { CompletionContext } from "@codemirror/autocomplete";

const langOptions = [
  { value: "css", extension: css(), label: "CSS" },
  { value: "cpp", extension: cpp(), label: "C++" },
  { value: "html", extension: html(), label: "HTML" },
  { value: "java", extension: java(), label: "Java" },
  { value: "javascript", extension: javascript(), label: "JavaScript" },
  { value: "json", extension: json(), label: "JSON" },
  { value: "lezer", extension: lezer(), label: "Lezer" },
  { value: "markdown", extension: markdown(), label: "Markdown" },
  { value: "php", extension: php(), label: "PHP" },
  { value: "python", extension: python(), label: "Python" },
  { value: "rust", extension: rust(), label: "Rust" },
  { value: "sql", extension: sql(), label: "SQL" },
  { value: "xml", extension: xml(), label: "XML" },
  { value: "less", extension: less(), label: "Less" },
  { value: "sass", extension: sass(), label: "Sass" },
];

export default langOptions;
