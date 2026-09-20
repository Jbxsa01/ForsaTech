import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Send,
  Search,
  Settings,
  LogOut,
  Briefcase,
  FileText,
  User,
  BookMarked,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";

interface Conversation {
  id: string;
  contactName: string;
  company?: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  avatar?: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const Messages = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAuth();
    fetchConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkAuth = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchConversations = async () => {
    try {
      // Mock data for now
      const mockConversations: Conversation[] = [
        {
          id: "1",
          contactName: "John Smith",
          company: "Tech Corp",
          lastMessage: "When can you start?",
          lastMessageTime: "2 hours ago",
          unread: true,
          avatar: "JS",
        },
        {
          id: "2",
          contactName: "Sarah Johnson",
          company: "StartupXYZ",
          lastMessage: "We'd like to schedule an interview",
          lastMessageTime: "5 hours ago",
          unread: false,
          avatar: "SJ",
        },
        {
          id: "3",
          contactName: "Mike Chen",
          company: "Data Solutions Inc",
          lastMessage: "Thanks for applying!",
          lastMessageTime: "1 day ago",
          unread: false,
          avatar: "MC",
        },
        {
          id: "4",
          contactName: "Emily Rodriguez",
          company: "Design Labs",
          lastMessage: "Your profile looks great",
          lastMessageTime: "2 days ago",
          unread: false,
          avatar: "ER",
        },
      ];
      setConversations(mockConversations);
      // Auto-select first conversation
      if (mockConversations.length > 0) {
        setSelectedConversation(mockConversations[0].id);
        fetchMessages(mockConversations[0].id);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      toast.error("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      // Mock messages for now
      const mockMessages: Message[] = [
        {
          id: "1",
          sender: "John Smith",
          content: "Hi! We've reviewed your application and we're impressed!",
          timestamp: "10:30 AM",
          isOwn: false,
        },
        {
          id: "2",
          sender: "You",
          content: "Thank you! I'm very interested in this opportunity.",
          timestamp: "10:45 AM",
          isOwn: true,
        },
        {
          id: "3",
          sender: "John Smith",
          content: "When can you start?",
          timestamp: "11:00 AM",
          isOwn: false,
        },
      ];
      setMessages(mockMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      sender: "You",
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");

    try {
      // TODO: Send message to backend
      toast.success("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");
    localStorage.removeItem("user_role");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const sidebarItems = [
    { icon: Briefcase, label: "Jobs", href: "/dashboard" },
    { icon: FileText, label: "Resume", href: "/candidate/resume" },
    { icon: User, label: "Profile", href: "/candidate/profile" },
    { icon: Briefcase, label: "Applications", href: "/candidate/applications" },
    { icon: BookMarked, label: "Saved Jobs", href: "/candidate/saved" },
    { icon: MessageSquare, label: "Messages", href: "/messages", active: true },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card">
        <div className="p-6">
          <Link to="/dashboard" className="text-2xl font-bold text-primary">
            ForsaTech
          </Link>
        </div>

        <nav className="space-y-2 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-border bg-card flex flex-col">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-foreground">Messages</h2>
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-2 p-4">
              {filteredConversations.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No conversations</p>
              ) : (
                filteredConversations.map((conversation) => (
                  <Card
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversation(conversation.id);
                      fetchMessages(conversation.id);
                    }}
                    className={`p-4 cursor-pointer transition ${
                      selectedConversation === conversation.id
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                        {conversation.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-foreground truncate">
                            {conversation.contactName}
                          </h3>
                          {conversation.unread && (
                            <Badge className="bg-primary text-primary-foreground">New</Badge>
                          )}
                        </div>
                        {conversation.company && (
                          <p className="text-xs text-muted-foreground">
                            {conversation.company}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {conversation.lastMessageTime}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="border-b border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      {selectedConv.avatar}
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">
                        {selectedConv.contactName}
                      </h2>
                      {selectedConv.company && (
                        <p className="text-sm text-muted-foreground">
                          {selectedConv.company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent text-accent-foreground"
                        }`}
                      >
                        <p className="break-words">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-border bg-card p-6">
                <div className="flex gap-3">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="gap-2"
                    disabled={!messageInput.trim()}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Messages;
