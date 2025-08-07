"use client";

import {
  FC,
  Fragment,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import LayoutChat from "@components/layout/layout-chat";
import Greeting from "@components/greeting";
import { useApp } from "@context/app-context";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sender } from "@type/chat";
import { useRouter } from "next/navigation";

const NewChatPage: FC = () => {
  //console.log("🚀 ~ session:", session)
  const { model, setReload } = useApp();
  const [messages, setMessages] = useState<any>([]);
  const router = useRouter();
  //console.log("🚀 ~ messages:", messages)
  const [messagesState, setMessagesState] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");
  //console.log("🚀 ~ sessionId:", sessionId)
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const lastResponseRef = useRef("");
  const prevController = useRef<AbortController | null>(null);
  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // ป้องกันการขึ้นบรรทัดใหม่
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (model === "nova") {
      // console.log("Hello");
      if (userMessage.trim() === "") return;

      setMessagesState(true);
      setLoading(true);
      setUserMessage("");
      lastResponseRef.current = "";

      // Abort previous request if any
      if (prevController.current) {
        prevController.current.abort();
      }

      const controller = new AbortController();
      prevController.current = controller;
      const signal = controller.signal;

      // เพิ่มข้อความของ user ทันที
      // หลังจาก user ส่งข้อความ
      setMessages((prev: any) => [
        ...prev,
        { type: sender.user, text: userMessage },
        { type: sender.bot, text: "" }, // bot ตอบเปล่าไว้ก่อน
      ]);
      setUserMessage(""); // เคลียร์ช่อง input

      try {
        const response = await fetch(
          "https://vqxvrjmsbekov4pfe5i4leoytm0wkmht.lambda-url.us-east-1.on.aws/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: userMessage,

              parameters: {},
              debug: {},
            }),
            signal,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch response");
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        // let fullBotResponse = "";

        const processStream = async () => {
          while (true) {
            if (signal.aborted) return;

            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");
            for (const line of lines) {
              const dataStr = line.trim();

              if (dataStr) {
                try {
                  const event = JSON.parse(dataStr);
                  if (event.output?.text) {
                    const newText = event.output.text.slice(
                      lastResponseRef.current.length
                    );
                    lastResponseRef.current = event.output.text;
                    appendToLastBotMessage(newText);
                    // fullBotResponse = event.output.text;
                  }
                  if (event.output?.finish_reason === "stop") {
                    // console.log("response📦" + event.output.session_id);
                    // await updateChatlog(fullBotResponse, event.output.session_id);
                    controller.abort(); // end stream
                  }
                } catch (e) {
                  //console.error("Error parsing JSON:", e);
                }
              }
            }
          }
        };
        await processStream();
        setLoading(false);
      } catch (err: any) {
        //console.log(err);
        setMessages((prev: any) => [
          ...prev,
          { type: sender.bot, text: "Error: can't reply" },
        ]);
      } finally {
        setLoading(false);
        if (controller === prevController.current) {
          prevController.current = null;
        }
      }
      setMessagesState(false);
    }
    setMessagesState(false);
    setReload((prev) => !prev);
  };

  // Use with steam
  const appendToLastBotMessage = (newText: string) => {
    setMessages((prev: any) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;
      if (updated[lastIndex]?.type === sender.bot) {
        updated[lastIndex] = {
          ...updated[lastIndex],
          text: updated[lastIndex].text + newText,
        };
      }
      return updated;
    });
  };

  // const updateChatlog = async (fullBotResponse: string, session_Id: string) => {
  //     try {
  //         const response = await updateChatlogUser(session_Id, session!.user.id, model, userMessage, sender.user);
  //         if (response!.status === 201) {
  //             updateChatlogBot(session_Id, fullBotResponse, sender.bot);
  //         }
  //     } catch (error) {

  //     }
  // }

  useEffect(() => {
    //setSessionId(uuidv4());
    //fetchSessions();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}>
      <LayoutChat>
        <Container maxWidth="md">
          <Stack
            direction="column"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            {messages.length === 0 && (
              <Fragment>
                <Box
                  component="img"
                  src={"/105-chat.png"}
                  sx={{
                    width: 250,
                    borderRadius: 4,
                    // my: 1,
                  }}
                />
                {/* <Greeting /> */}
              </Fragment>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <Box
                sx={(theme) => ({
                  maxHeight: "calc(100vh - 230px)",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: theme.palette.background.default,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: theme.palette.divider,
                    borderRadius: "3px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: theme.palette.text.secondary,
                  },
                })}
              >
                {messages.map(
                  (
                    message: {
                      correct: boolean;
                      type: string;
                      text: string;
                      React:
                        | ReactElement
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined;
                    },
                    index: React.Key | null | undefined
                  ) => (
                    <Fragment key={index}>
                      <Box
                        sx={{
                          mt: 4,
                          mx: 2,
                          p: 2,
                          borderRadius: 4,
                          maxWidth: "70%",
                          alignSelf:
                            message.type === sender.bot
                              ? "flex-start"
                              : "flex-end",
                          bgcolor:
                            message.type === sender.bot ? "" : "primary.main",
                          color: "text.secondary",
                        }}
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p({ children }) {
                              return (
                                <p style={{ whiteSpace: "pre-wrap" }}>
                                  {children}
                                </p>
                              );
                            },
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </Box>
                      <div ref={messagesEndRef} />
                    </Fragment>
                  )
                )}
              </Box>

              <Paper
                component="form"
                sx={{
                  p: 2,
                  width: "100%",
                  borderRadius: 4,
                }}
              >
                <Grid container>
                  <Grid size={12}>
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="How can I help you today?"
                      inputProps={{ "aria-label": "How can I help you today?" }}
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      fullWidth
                      disabled={messagesState}
                      multiline
                      maxRows={4}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
                      <IconButton
                        color="primary"
                        sx={{
                          p: "10px",
                          backgroundColor:
                            userMessage.length === 0 || loading
                              ? "rgb(240, 242, 245)"
                              : "primary", // สีเทาเมื่อ disabled
                          color:
                            userMessage.length === 0 || loading
                              ? "#8c8c8c"
                              : "",
                        }}
                        aria-label="directions"
                        disabled={
                          !(userMessage.length != 0 || loading === true)
                        }
                        onClick={handleSendMessage}
                        loading={loading}
                      >
                        <SendIcon />
                      </IconButton>
                    </Stack>
                  </Grid>
                </Grid>
                {/* <Divider sx={{ height: 48 }} orientation="vertical" /> */}
              </Paper>
            </Box>
            {messages.length != 0 && (
              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                105 Chat can make mistakes.
              </Typography>
            )}
          </Stack>
        </Container>
      </LayoutChat>
    </Box>
  );
};

export default NewChatPage;
