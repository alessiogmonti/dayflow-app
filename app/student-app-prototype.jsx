import { useState, useEffect } from "react";

export const App = () => {
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Math Assignment Ch.5",
      subject: "Mathematics",
      due: "Tomorrow",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "History Essay Draft",
      subject: "History",
      due: "In 3 days",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Physics Lab Report",
      subject: "Physics",
      due: "Next week",
      priority: "low",
      completed: true,
    },
  ]);
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Mathematics",
      time: "09:00",
      room: "Room 204",
      color: "#8B5CF6",
    },
    {
      id: 2,
      name: "History",
      time: "11:00",
      room: "Room 112",
      color: "#EC4899",
    },
    { id: 3, name: "Physics", time: "14:00", room: "Lab B", color: "#06B6D4" },
  ]);

  useEffect(() => {
    let interval;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const priorityColors = {
    high: "#EF4444",
    medium: "#F59E0B",
    low: "#22C55E",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(165deg, #1a1625 0%, #2d1f47 50%, #1a1625 100%)",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .slide-up { animation: slideUp 0.4s ease-out forwards; }
        .fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .scale-in { animation: scaleIn 0.3s ease-out forwards; }
        .pulse { animation: pulse 2s infinite; }
        
        input, select, textarea {
          font-family: inherit;
          font-size: 16px;
        }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(139, 92, 246, 0.3); border-radius: 4px; }
      `}</style>

      {/* Phone Frame */}
      <div
        style={{
          width: "375px",
          height: "812px",
          background: "linear-gradient(180deg, #1e1730 0%, #251b3d 100%)",
          borderRadius: "44px",
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "0 50px 100px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}>
        {/* Status Bar */}
        <div
          style={{
            height: "44px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 28px",
            color: "rgba(255,255,255,0.8)",
            fontSize: "14px",
            fontWeight: "600",
          }}>
          <span>9:41</span>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <svg width="17" height="11" viewBox="0 0 17 11" fill="white">
              <path
                d="M10.5 2.5H12.5C13.6 2.5 14.5 3.4 14.5 4.5V6.5C14.5 7.6 13.6 8.5 12.5 8.5H10.5V2.5Z"
                opacity="0.3"
              />
              <path
                d="M0 4C0 2.34 1.34 1 3 1H10C11.66 1 13 2.34 13 4V7C13 8.66 11.66 10 10 10H3C1.34 10 0 8.66 0 7V4ZM3 2.5C2.17 2.5 1.5 3.17 1.5 4V7C1.5 7.83 2.17 8.5 3 8.5H10C10.83 8.5 11.5 7.83 11.5 7V4C11.5 3.17 10.83 2.5 10 2.5H3Z"
                fill="white"
              />
              <rect x="2" y="3" width="9" height="5" rx="1" fill="white" />
            </svg>
          </div>
        </div>

        {/* Dynamic Notch */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "126px",
            height: "34px",
            background: "#000",
            borderRadius: "20px",
          }}
        />

        {/* Content Area */}
        <div
          style={{
            height: "calc(100% - 44px - 80px)",
            overflowY: "auto",
            padding: "20px",
          }}>
          {/* Dashboard Screen */}
          {currentScreen === "dashboard" && (
            <div className="slide-up">
              <div style={{ marginBottom: "28px" }}>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "14px",
                    marginBottom: "4px",
                  }}>
                  Good morning
                </p>
                <h1
                  style={{
                    color: "#fff",
                    fontSize: "28px",
                    fontWeight: "700",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                  Ready to learn? 📚
                </h1>
              </div>

              {/* Today's Classes */}
              <div style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}>
                  <h2
                    style={{
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}>
                    Today's Classes
                  </h2>
                  <button
                    onClick={() => setShowAddClass(true)}
                    style={{
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "none",
                      borderRadius: "12px",
                      padding: "8px 14px",
                      color: "#A78BFA",
                      fontSize: "13px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}>
                    + Add
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    overflowX: "auto",
                    paddingBottom: "8px",
                    marginLeft: "-20px",
                    marginRight: "-20px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}>
                  {classes.map((cls, i) => (
                    <div
                      key={cls.id}
                      className="slide-up"
                      style={{
                        minWidth: "140px",
                        background: `linear-gradient(135deg, ${cls.color}20 0%, ${cls.color}05 100%)`,
                        border: `1px solid ${cls.color}30`,
                        borderRadius: "20px",
                        padding: "18px",
                        animationDelay: `${i * 0.1}s`,
                      }}>
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: cls.color,
                          marginBottom: "12px",
                        }}
                      />
                      <p
                        style={{
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: "600",
                          marginBottom: "4px",
                        }}>
                        {cls.name}
                      </p>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "13px",
                        }}>
                        {cls.time}
                      </p>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "12px",
                          marginTop: "8px",
                        }}>
                        {cls.room}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}>
                  <h2
                    style={{
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}>
                    Upcoming Tasks
                  </h2>
                  <button
                    onClick={() => setShowAddTask(true)}
                    style={{
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "none",
                      borderRadius: "12px",
                      padding: "8px 14px",
                      color: "#A78BFA",
                      fontSize: "13px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}>
                    + Add
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}>
                  {tasks
                    .filter((t) => !t.completed)
                    .map((task, i) => (
                      <div
                        key={task.id}
                        className="slide-up"
                        onClick={() => {
                          setTasks(
                            tasks.map((t) =>
                              t.id === task.id
                                ? { ...t, completed: !t.completed }
                                : t
                            )
                          );
                        }}
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: "18px",
                          padding: "18px",
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          animationDelay: `${i * 0.1}s`,
                        }}>
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "8px",
                            border: `2px solid ${
                              priorityColors[task.priority]
                            }`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}>
                          {task.completed && (
                            <div
                              style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "4px",
                                background: priorityColors[task.priority],
                              }}
                            />
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              color: "#fff",
                              fontSize: "15px",
                              fontWeight: "500",
                              marginBottom: "4px",
                            }}>
                            {task.title}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              alignItems: "center",
                            }}>
                            <span
                              style={{
                                color: "rgba(255,255,255,0.4)",
                                fontSize: "13px",
                              }}>
                              {task.subject}
                            </span>
                            <span style={{ color: "rgba(255,255,255,0.3)" }}>
                              •
                            </span>
                            <span
                              style={{
                                color: priorityColors[task.priority],
                                fontSize: "13px",
                                fontWeight: "500",
                              }}>
                              {task.due}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Quick Study Button */}
              <button
                onClick={() => setCurrentScreen("study")}
                style={{
                  marginTop: "24px",
                  width: "100%",
                  background:
                    "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #EC4899 100%)",
                  border: "none",
                  borderRadius: "20px",
                  padding: "20px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 10px 40px -10px rgba(139, 92, 246, 0.5)",
                }}>
                <span style={{ fontSize: "20px" }}>🍅</span>
                Start Study Session
              </button>
            </div>
          )}

          {/* Timetable Screen */}
          {currentScreen === "timetable" && (
            <div className="slide-up">
              <h1
                style={{
                  color: "#fff",
                  fontSize: "28px",
                  fontWeight: "700",
                  fontFamily: "'Space Grotesk', sans-serif",
                  marginBottom: "24px",
                }}>
                Weekly Schedule
              </h1>

              {/* Day Selector */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "24px",
                  overflowX: "auto",
                }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                  <button
                    key={day}
                    style={{
                      background:
                        i === 0 ? "#8B5CF6" : "rgba(255,255,255,0.05)",
                      border: "none",
                      borderRadius: "14px",
                      padding: "12px 20px",
                      color: i === 0 ? "#fff" : "rgba(255,255,255,0.5)",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}>
                    {day}
                  </button>
                ))}
              </div>

              {/* Timeline */}
              <div style={{ position: "relative", paddingLeft: "60px" }}>
                {[
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                ].map((time, i) => (
                  <div
                    key={time}
                    style={{ position: "relative", height: "80px" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: "-50px",
                        top: "-8px",
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "12px",
                      }}>
                      {time}
                    </span>
                    <div
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        height: "1px",
                        width: "100%",
                      }}
                    />

                    {classes.find((c) => c.time === time) && (
                      <div
                        className="scale-in"
                        style={{
                          position: "absolute",
                          top: "8px",
                          left: "0",
                          right: "0",
                          background: `linear-gradient(135deg, ${
                            classes.find((c) => c.time === time).color
                          }30 0%, ${
                            classes.find((c) => c.time === time).color
                          }10 100%)`,
                          border: `1px solid ${
                            classes.find((c) => c.time === time).color
                          }40`,
                          borderLeft: `3px solid ${
                            classes.find((c) => c.time === time).color
                          }`,
                          borderRadius: "12px",
                          padding: "12px 16px",
                          animationDelay: `${i * 0.05}s`,
                        }}>
                        <p
                          style={{
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}>
                          {classes.find((c) => c.time === time).name}
                        </p>
                        <p
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "12px",
                            marginTop: "4px",
                          }}>
                          {classes.find((c) => c.time === time).room}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Study/Pomodoro Screen */}
          {currentScreen === "study" && (
            <div
              className="slide-up"
              style={{ textAlign: "center", paddingTop: "40px" }}>
              <h1
                style={{
                  color: "#fff",
                  fontSize: "24px",
                  fontWeight: "700",
                  fontFamily: "'Space Grotesk', sans-serif",
                  marginBottom: "8px",
                }}>
                Focus Session
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "14px",
                  marginBottom: "50px",
                }}>
                Stay focused, you got this! 💪
              </p>

              {/* Timer Circle */}
              <div
                style={{
                  width: "240px",
                  height: "240px",
                  borderRadius: "50%",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "4px solid rgba(139, 92, 246, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 50px",
                  position: "relative",
                }}>
                <svg
                  width="240"
                  height="240"
                  style={{ position: "absolute", transform: "rotate(-90deg)" }}>
                  <circle
                    cx="120"
                    cy="120"
                    r="114"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="4"
                    strokeDasharray={`${(pomodoroTime / (25 * 60)) * 716} 716`}
                    strokeLinecap="round"
                  />
                </svg>
                <div>
                  <p
                    style={{
                      color: "#fff",
                      fontSize: "56px",
                      fontWeight: "300",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                    {formatTime(pomodoroTime)}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}>
                    {pomodoroActive ? "Focusing..." : "Ready?"}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                }}>
                <button
                  onClick={() => setPomodoroTime(25 * 60)}
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}>
                  ↺
                </button>
                <button
                  onClick={() => setPomodoroActive(!pomodoroActive)}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: pomodoroActive
                      ? "rgba(239, 68, 68, 0.2)"
                      : "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
                    border: pomodoroActive
                      ? "2px solid rgba(239, 68, 68, 0.5)"
                      : "none",
                    color: "#fff",
                    fontSize: "24px",
                    cursor: "pointer",
                    boxShadow: pomodoroActive
                      ? "none"
                      : "0 10px 40px -10px rgba(139, 92, 246, 0.5)",
                  }}>
                  {pomodoroActive ? "⏸" : "▶"}
                </button>
                <button
                  onClick={() => setPomodoroTime(5 * 60)}
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}>
                  5m
                </button>
              </div>

              {/* Session Stats */}
              <div
                style={{
                  marginTop: "50px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "20px",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-around",
                }}>
                <div>
                  <p
                    style={{
                      color: "#8B5CF6",
                      fontSize: "24px",
                      fontWeight: "700",
                    }}>
                    4
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "12px",
                    }}>
                    Sessions today
                  </p>
                </div>
                <div
                  style={{ width: "1px", background: "rgba(255,255,255,0.1)" }}
                />
                <div>
                  <p
                    style={{
                      color: "#8B5CF6",
                      fontSize: "24px",
                      fontWeight: "700",
                    }}>
                    1h 40m
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "12px",
                    }}>
                    Focus time
                  </p>
                </div>
                <div
                  style={{ width: "1px", background: "rgba(255,255,255,0.1)" }}
                />
                <div>
                  <p
                    style={{
                      color: "#22C55E",
                      fontSize: "24px",
                      fontWeight: "700",
                    }}>
                    🔥 5
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "12px",
                    }}>
                    Day streak
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Grades Screen */}
          {currentScreen === "grades" && (
            <div className="slide-up">
              <h1
                style={{
                  color: "#fff",
                  fontSize: "28px",
                  fontWeight: "700",
                  fontFamily: "'Space Grotesk', sans-serif",
                  marginBottom: "8px",
                }}>
                My Progress
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "14px",
                  marginBottom: "28px",
                }}>
                Keep up the great work! 🌟
              </p>

              {/* GPA Card */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #8B5CF6 100%)",
                  borderRadius: "24px",
                  padding: "28px",
                  marginBottom: "24px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "100px",
                    height: "100px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "-30px",
                    right: "40px",
                    width: "60px",
                    height: "60px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "50%",
                  }}
                />
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}>
                  Current GPA
                </p>
                <p
                  style={{
                    color: "#fff",
                    fontSize: "48px",
                    fontWeight: "700",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                  3.75
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "13px",
                    marginTop: "8px",
                  }}>
                  ↑ 0.15 from last semester
                </p>
              </div>

              {/* Subject Grades */}
              <h2
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}>
                Subject Grades
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}>
                {[
                  {
                    name: "Mathematics",
                    grade: "A",
                    score: 92,
                    color: "#8B5CF6",
                  },
                  { name: "History", grade: "A-", score: 88, color: "#EC4899" },
                  { name: "Physics", grade: "B+", score: 85, color: "#06B6D4" },
                  {
                    name: "Literature",
                    grade: "A",
                    score: 94,
                    color: "#22C55E",
                  },
                ].map((subject, i) => (
                  <div
                    key={subject.name}
                    className="slide-up"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "18px",
                      padding: "18px",
                      animationDelay: `${i * 0.1}s`,
                    }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}>
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: subject.color,
                          }}
                        />
                        <span
                          style={{
                            color: "#fff",
                            fontSize: "15px",
                            fontWeight: "500",
                          }}>
                          {subject.name}
                        </span>
                      </div>
                      <span
                        style={{
                          color: "#fff",
                          fontSize: "18px",
                          fontWeight: "700",
                        }}>
                        {subject.grade}
                      </span>
                    </div>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        height: "8px",
                        overflow: "hidden",
                      }}>
                      <div
                        style={{
                          background: subject.color,
                          height: "100%",
                          width: `${subject.score}%`,
                          borderRadius: "10px",
                          transition: "width 0.5s",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "rgba(30, 23, 48, 0.95)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            paddingBottom: "10px",
          }}>
          {[
            { id: "dashboard", icon: "🏠", label: "Home" },
            { id: "timetable", icon: "📅", label: "Schedule" },
            { id: "study", icon: "🍅", label: "Focus" },
            { id: "grades", icon: "📊", label: "Progress" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              style={{
                background: "none",
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                opacity: currentScreen === item.id ? 1 : 0.5,
                transition: "opacity 0.2s",
              }}>
              <span style={{ fontSize: "22px" }}>{item.icon}</span>
              <span
                style={{
                  color:
                    currentScreen === item.id
                      ? "#8B5CF6"
                      : "rgba(255,255,255,0.5)",
                  fontSize: "11px",
                  fontWeight: "500",
                }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Add Task Modal */}
        {showAddTask && (
          <div
            className="fade-in"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "flex-end",
              zIndex: 100,
            }}
            onClick={() => setShowAddTask(false)}>
            <div
              className="slide-up"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "linear-gradient(180deg, #2d2145 0%, #251b3d 100%)",
                borderRadius: "28px 28px 0 0",
                padding: "28px",
                width: "100%",
              }}>
              <div
                style={{
                  width: "40px",
                  height: "4px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "2px",
                  margin: "0 auto 24px",
                }}
              />
              <h2
                style={{
                  color: "#fff",
                  fontSize: "22px",
                  fontWeight: "600",
                  marginBottom: "24px",
                }}>
                Add New Task
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}>
                <input
                  placeholder="Task title"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px",
                    padding: "16px",
                    color: "#fff",
                    outline: "none",
                  }}
                />
                <select
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px",
                    padding: "16px",
                    color: "rgba(255,255,255,0.7)",
                    outline: "none",
                    appearance: "none",
                  }}>
                  <option>Select subject</option>
                  <option>Mathematics</option>
                  <option>History</option>
                  <option>Physics</option>
                </select>
                <div style={{ display: "flex", gap: "12px" }}>
                  <input
                    type="date"
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "14px",
                      padding: "16px",
                      color: "rgba(255,255,255,0.7)",
                      outline: "none",
                    }}
                  />
                  <select
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "14px",
                      padding: "16px",
                      color: "rgba(255,255,255,0.7)",
                      outline: "none",
                      appearance: "none",
                    }}>
                    <option>Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowAddTask(false)}
                  style={{
                    background:
                      "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
                    border: "none",
                    borderRadius: "14px",
                    padding: "18px",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Class Modal */}
        {showAddClass && (
          <div
            className="fade-in"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "flex-end",
              zIndex: 100,
            }}
            onClick={() => setShowAddClass(false)}>
            <div
              className="slide-up"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "linear-gradient(180deg, #2d2145 0%, #251b3d 100%)",
                borderRadius: "28px 28px 0 0",
                padding: "28px",
                width: "100%",
              }}>
              <div
                style={{
                  width: "40px",
                  height: "4px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "2px",
                  margin: "0 auto 24px",
                }}
              />
              <h2
                style={{
                  color: "#fff",
                  fontSize: "22px",
                  fontWeight: "600",
                  marginBottom: "24px",
                }}>
                Add New Class
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}>
                <input
                  placeholder="Class name"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px",
                    padding: "16px",
                    color: "#fff",
                    outline: "none",
                  }}
                />
                <div style={{ display: "flex", gap: "12px" }}>
                  <input
                    type="time"
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "14px",
                      padding: "16px",
                      color: "rgba(255,255,255,0.7)",
                      outline: "none",
                    }}
                  />
                  <input
                    placeholder="Room"
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "14px",
                      padding: "16px",
                      color: "#fff",
                      outline: "none",
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {[
                    "#8B5CF6",
                    "#EC4899",
                    "#06B6D4",
                    "#22C55E",
                    "#F59E0B",
                    "#EF4444",
                  ].map((color) => (
                    <button
                      key={color}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: color,
                        border: "none",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setShowAddClass(false)}
                  style={{
                    background:
                      "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
                    border: "none",
                    borderRadius: "14px",
                    padding: "18px",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}>
                  Add Class
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
