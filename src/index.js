import {
  Hono
} from "hono";
import { getAllTodos, delTodo, updateTodo, addTodo } from './action.js'
import { carousel } from './MessageTemp.js'
const app = new Hono();

const accessToken = "XI9Y6BPv8yMJinsvgXt040voYrDAQnAyqnQGDPFDard6QgpTAtKlZRNU0hP7pto5q5LN0iOnJwcYtaz2CXrauZ5HeCbxAJCAqC+/phY0tvjiaXlRwFOAdSkIGXWSGpzHBdWaGVFJNhh7hpBfy3dsQwdB04t89/1O/w1cDnyilFU="

function Message(text) {
  const message = {
    type: 'text',
    text: text
  };
  return message;
}




const replyMessage = (replyToken, replyMessage) => {
  fetch("https://api.line.me/v2/bot/message/reply", {
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [replyMessage],
    }),
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .catch((e) => console.log("fail", e));
}

app.get("*", (c) => c.text("Hello World!"));


app.post("/api/webhook", async (c) => {
  const data = await c.req.json();
  const events = data.events;
  const messageText = events[0].message.text;
  const replyToken = events[0].replyToken;
  if (messageText === "查詢") {
    const todo = await getAllTodos()
    const message2 = carousel(todo.result)
    replyMessage(replyToken, message2);
  } else if (messageText.includes("新增") === true) {
    let title = messageText.split(" ")[1]
    let content = messageText.split(" ")[2]
    const todo = await addTodo(title, content)
    if (todo.status == "200") {
      replyMessage(replyToken, Message("成功新增"));
    } else {
      replyMessage(replyToken, Message("新增失敗"));
    }

    replyMessage(replyToken, messageText);
  } else if (messageText.includes("確定刪除") === true) {
    let toDelete = messageText.split(" ")[1]
    const todo = await delTodo(toDelete)
    if (todo.status == "200") {
      replyMessage(replyToken, Message("已經刪除"));
    } else {
      replyMessage(replyToken, Message("刪除失敗"));
    }
  } else if (messageText.includes("標記為完成") === true) {
    let toUpdate = messageText.split(" ")[1]
    const todo = await updateTodo(toUpdate)
    if (todo.status == "200") {
      replyMessage(replyToken, Message("已經標記完成"));
    } else {
      replyMessage(replyToken, Message("標記失敗"));
    }
  }




  return c.json(events);
});

export default app;