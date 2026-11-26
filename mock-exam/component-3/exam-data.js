window.EXAM_CONFIG = {
  "examId": "g12-cs-component3-covered-topics-2026-v1",
  "title": "Computer Science Mock Examination — Component 3",
  "subtitle": "Problem-solving and Programming Skills · Covered Topics Practice",
  "durationMin": 120,
  "maxMarks": 60,
  "submitUrl": "https://script.google.com/macros/s/AKfycbzBj7KrWyVBRlqNffyMMXf4jNIk5yOFrpAqBO7yKCk76kxpzN6nre8pnS_o-kMBXiOy/exec",
  "draftEveryMs": 45000,
  "rules": [
    "Answer all questions in English.",
    "You may write code in pseudocode or a programming language you studied.",
    "This digital mock includes only Component 3 content already covered in class; mobile application development is not assessed in this version.",
    "Some structured parts are marked automatically after submission. Open code/explanation parts are reserved for AI/teacher marking.",
    "Your answers are saved on this device and periodically synced to the teacher's Google Sheet.",
    "Pasting text into answer fields is disabled. Question text cannot be selected or copied in the normal interface.",
    "When time expires, the examination is submitted automatically."
  ],
  "questions": [
    {
      "number": 1,
      "title": "Assembly language and tracing",
      "topic": "Grade 11 revision · algorithms and low-level programming",
      "intro": "Use the mnemonic table provided in class. For the trace table, enter a value only when it changes; otherwise leave the cell blank.",
      "parts": [
        {
          "label": "(a)",
          "prompt": "Select one assembly-language instruction used to transfer data between memory and the accumulator.",
          "marks": 1,
          "fields": [
            {
              "key": "1a",
              "input": "select",
              "label": "Instruction",
              "options": [
                "LDA",
                "STA",
                "ADD",
                "BRZ",
                "OUT"
              ]
            }
          ]
        },
        {
          "label": "(b)",
          "prompt": "The program below repeatedly subtracts 3 from an input value. Trace the program for input 8.",
          "marks": 5,
          "code": "00          INP\n01          STA VALUE\n02          LDA ZERO\n03          STA COUNT\n04 LOOP     LDA VALUE\n05          SUB THREE\n06          BRP STORE\n07          LDA COUNT\n08          OUT\n09          HLT\n10 STORE    STA VALUE\n11          LDA COUNT\n12          ADD ONE\n13          STA COUNT\n14          BRA LOOP\n15 ONE      DAT 1\n16 THREE    DAT 3\n17 ZERO     DAT 0\n18 VALUE    DAT\n19 COUNT    DAT 0",
          "table": {
            "key": "1b_trace",
            "columns": [
              {
                "id": "acc",
                "label": "Accumulator"
              },
              {
                "id": "m18",
                "label": "Memory 18"
              },
              {
                "id": "m19",
                "label": "Memory 19"
              },
              {
                "id": "cond",
                "label": "Condition"
              },
              {
                "id": "out",
                "label": "Output"
              }
            ],
            "rows": [
              {
                "id": "r00",
                "label": "after 00 INP"
              },
              {
                "id": "r01",
                "label": "after 01 STA VALUE"
              },
              {
                "id": "r03",
                "label": "after 03 STA COUNT"
              },
              {
                "id": "r05a",
                "label": "after 05 SUB THREE (1st time)"
              },
              {
                "id": "r06a",
                "label": "after 06 BRP STORE (1st time)"
              },
              {
                "id": "r13a",
                "label": "after 13 STA COUNT (1st time)"
              },
              {
                "id": "r05b",
                "label": "after 05 SUB THREE (2nd time)"
              },
              {
                "id": "r13b",
                "label": "after 13 STA COUNT (2nd time)"
              },
              {
                "id": "r06c",
                "label": "after 06 BRP STORE (3rd time)"
              },
              {
                "id": "r08",
                "label": "after 08 OUT"
              }
            ],
            "placeholder": "",
            "compact": true
          }
        },
        {
          "label": "(c)",
          "prompt": "Describe the purpose of the program for a positive integer input.",
          "marks": 2,
          "fields": [
            {
              "key": "1c",
              "input": "long",
              "placeholder": "Describe what the program calculates and outputs."
            }
          ]
        }
      ]
    },
    {
      "number": 2,
      "title": "Programming and testing",
      "topic": "Grade 11/12 · programming and system testing",
      "parts": [
        {
          "label": "(a)",
          "prompt": "A program stores eight temperature readings and outputs their average and the number of readings above 25. Complete the missing parts.",
          "marks": 5,
          "code": "total ← 0\nhot ← 0\nFOR i ← 1 TO [ A ]\n    INPUT temp\n    total ← [ B ]\n    IF [ C ] THEN\n        hot ← [ D ]\n    ENDIF\nNEXT i\naverage ← [ E ]\nOUTPUT average, hot",
          "fields": [
            {
              "key": "2a_A",
              "input": "select",
              "label": "Blank A",
              "options": [
                "6",
                "8",
                "10",
                "temp"
              ]
            },
            {
              "key": "2a_B",
              "input": "select",
              "label": "Blank B",
              "options": [
                "total + temp",
                "temp + 1",
                "total / temp",
                "hot + temp"
              ]
            },
            {
              "key": "2a_C",
              "input": "select",
              "label": "Blank C",
              "options": [
                "temp > 25",
                "temp < 25",
                "hot > 25",
                "total > 25"
              ]
            },
            {
              "key": "2a_D",
              "input": "select",
              "label": "Blank D",
              "options": [
                "hot + 1",
                "hot + temp",
                "total + 1",
                "1"
              ]
            },
            {
              "key": "2a_E",
              "input": "select",
              "label": "Blank E",
              "options": [
                "total / 8",
                "total / hot",
                "8 / total",
                "total * 8"
              ]
            }
          ]
        },
        {
          "label": "(b)",
          "prompt": "A separate program accepts an integer in the inclusive range 0 to 50. Select a suitable example of each test-data type.",
          "marks": 3,
          "fields": [
            {
              "key": "2b_normal",
              "input": "select",
              "label": "Normal data",
              "options": [
                "25",
                "0",
                "50",
                "-1",
                "\"twenty\""
              ]
            },
            {
              "key": "2b_extreme",
              "input": "select",
              "label": "Extreme data",
              "options": [
                "25",
                "0",
                "-1",
                "51",
                "\"twenty\""
              ]
            },
            {
              "key": "2b_err",
              "input": "select",
              "label": "Erroneous data",
              "options": [
                "25",
                "0",
                "50",
                "-1",
                "40"
              ]
            }
          ]
        },
        {
          "label": "(c)",
          "prompt": "The loop below is intended to execute eight times, but it contains a logic error. Select the line with the error and explain how to correct it.",
          "marks": 2,
          "code": "1  i ← 0\n2  WHILE i > 8\n3      OUTPUT i\n4      i ← i + 1\n5  ENDWHILE",
          "fields": [
            {
              "key": "2c_line",
              "input": "select",
              "label": "Line with the error",
              "options": [
                "1",
                "2",
                "3",
                "4",
                "5"
              ]
            },
            {
              "key": "2c_explain",
              "input": "long",
              "label": "Correction and explanation"
            }
          ]
        }
      ]
    },
    {
      "number": 3,
      "title": "Arrays and sorting",
      "topic": "Grade 11 · algorithms and data structures",
      "parts": [
        {
          "label": "(a)",
          "prompt": "A program stores 20 integer scores that are processed in order. Select the most suitable basic data structure.",
          "marks": 1,
          "fields": [
            {
              "key": "3a",
              "input": "select",
              "options": [
                "One-dimensional array",
                "Two-dimensional array",
                "Stack",
                "Queue"
              ]
            }
          ]
        },
        {
          "label": "(b)",
          "prompt": "Complete the bubble-sort algorithm so that arr is sorted into ascending order.",
          "marks": 4,
          "code": "n ← LENGTH(arr)\nFOR i ← 0 TO n - 2\n    FOR j ← 0 TO [ A ]\n        IF [ B ] THEN\n            temp ← arr[j]\n            arr[j] ← [ C ]\n            [ D ] ← temp\n        ENDIF\n    NEXT j\nNEXT i",
          "fields": [
            {
              "key": "3b_A",
              "input": "select",
              "label": "Blank A",
              "options": [
                "n - i - 2",
                "n - 1",
                "i",
                "n + i"
              ]
            },
            {
              "key": "3b_B",
              "input": "select",
              "label": "Blank B",
              "options": [
                "arr[j] > arr[j + 1]",
                "arr[j] < arr[j + 1]",
                "arr[i] > arr[j]",
                "arr[j] = arr[j + 1]"
              ]
            },
            {
              "key": "3b_C",
              "input": "select",
              "label": "Blank C",
              "options": [
                "arr[j + 1]",
                "arr[i]",
                "temp",
                "arr[j - 1]"
              ]
            },
            {
              "key": "3b_D",
              "input": "select",
              "label": "Blank D",
              "options": [
                "arr[j + 1]",
                "arr[j]",
                "arr[i + 1]",
                "temp"
              ]
            }
          ]
        },
        {
          "label": "(c)",
          "prompt": "The array is [9, 3, 7, 1]. Give the state of the array after the first and second complete passes of the ascending bubble sort in part (b).",
          "marks": 2,
          "fields": [
            {
              "key": "3c_pass1",
              "input": "short",
              "label": "After pass 1",
              "placeholder": "e.g. 1, 2, 3, 4"
            },
            {
              "key": "3c_pass2",
              "input": "short",
              "label": "After pass 2",
              "placeholder": "e.g. 1, 2, 3, 4"
            }
          ]
        },
        {
          "label": "(d)",
          "prompt": "Explain how a bubble-sort implementation can stop early when the array is already sorted.",
          "marks": 2,
          "fields": [
            {
              "key": "3d",
              "input": "long"
            }
          ]
        }
      ]
    },
    {
      "number": 4,
      "title": "Binary search",
      "topic": "Grade 11 · searching algorithms",
      "parts": [
        {
          "label": "(a)",
          "prompt": "Complete the binary-search pseudocode. The array data is already sorted in ascending order.",
          "marks": 4,
          "code": "low ← 0\nhigh ← LENGTH(data) - 1\nWHILE [ A ]\n    mid ← [ B ]\n    IF data[mid] = target THEN\n        RETURN mid\n    ELSE IF data[mid] < target THEN\n        [ C ]\n    ELSE\n        [ D ]\n    ENDIF\nENDWHILE\nRETURN -1",
          "fields": [
            {
              "key": "4a_A",
              "input": "select",
              "label": "Blank A",
              "options": [
                "low <= high",
                "low = high",
                "low > high",
                "mid <= high"
              ]
            },
            {
              "key": "4a_B",
              "input": "select",
              "label": "Blank B",
              "options": [
                "(low + high) DIV 2",
                "high DIV 2",
                "low + 1",
                "(low + high) * 2"
              ]
            },
            {
              "key": "4a_C",
              "input": "select",
              "label": "Blank C",
              "options": [
                "low ← mid + 1",
                "high ← mid - 1",
                "low ← mid - 1",
                "high ← mid + 1"
              ]
            },
            {
              "key": "4a_D",
              "input": "select",
              "label": "Blank D",
              "options": [
                "high ← mid - 1",
                "low ← mid + 1",
                "high ← mid + 1",
                "low ← mid - 1"
              ]
            }
          ]
        },
        {
          "label": "(b)",
          "prompt": "A binary search is performed on a sorted array containing 64 elements. Select the maximum number of comparisons required in the usual worst case to find an element.",
          "marks": 1,
          "fields": [
            {
              "key": "4b",
              "input": "select",
              "options": [
                "6",
                "7",
                "8",
                "32",
                "64"
              ]
            }
          ]
        },
        {
          "label": "(c)",
          "prompt": "Select the time complexity of binary search.",
          "marks": 1,
          "fields": [
            {
              "key": "4c",
              "input": "select",
              "options": [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n²)"
              ]
            }
          ]
        },
        {
          "label": "(d)",
          "prompt": "Explain why binary search requires the data to be sorted.",
          "marks": 2,
          "fields": [
            {
              "key": "4d",
              "input": "long"
            }
          ]
        }
      ]
    },
    {
      "number": 5,
      "title": "Stacks, queues and binary search trees",
      "topic": "Grade 11 · data structures",
      "parts": [
        {
          "label": "(a)",
          "prompt": "Match each data structure to its defining access rule.",
          "marks": 2,
          "fields": [
            {
              "key": "5a_stack",
              "input": "select",
              "label": "Stack",
              "options": [
                "LIFO — last in, first out",
                "FIFO — first in, first out",
                "Hierarchical parent/child order"
              ]
            },
            {
              "key": "5a_queue",
              "input": "select",
              "label": "Queue",
              "options": [
                "LIFO — last in, first out",
                "FIFO — first in, first out",
                "Hierarchical parent/child order"
              ]
            }
          ]
        },
        {
          "label": "(b)",
          "prompt": "A stack initially contains A, B, C from bottom to top (C is the top). The operations POP(), PUSH(D), PUSH(E), POP() are performed. Complete the final state.",
          "marks": 2,
          "fields": [
            {
              "key": "5b_top",
              "input": "select",
              "label": "Top item",
              "options": [
                "A",
                "B",
                "C",
                "D",
                "E"
              ]
            },
            {
              "key": "5b_state",
              "input": "short",
              "label": "Final stack from bottom to top",
              "placeholder": "e.g. A, B, C"
            }
          ]
        },
        {
          "label": "(c)",
          "prompt": "The values 8, 3, 10, 1, 6, 14, 4 are inserted into an empty binary search tree in that order. Complete the requested node positions.",
          "marks": 4,
          "fields": [
            {
              "key": "5c_l8",
              "input": "select",
              "label": "Left child of 8",
              "options": [
                "1",
                "3",
                "4",
                "6",
                "10",
                "14"
              ]
            },
            {
              "key": "5c_r8",
              "input": "select",
              "label": "Right child of 8",
              "options": [
                "1",
                "3",
                "4",
                "6",
                "10",
                "14"
              ]
            },
            {
              "key": "5c_l3",
              "input": "select",
              "label": "Left child of 3",
              "options": [
                "1",
                "3",
                "4",
                "6",
                "10",
                "14"
              ]
            },
            {
              "key": "5c_r3",
              "input": "select",
              "label": "Right child of 3",
              "options": [
                "1",
                "3",
                "4",
                "6",
                "10",
                "14"
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 6,
      "title": "Expert systems and declarative rules",
      "topic": "Grade 12 · 12.5.1.2 Expert systems",
      "intro": "The following knowledge base describes rooms in a smart building.",
      "parts": [
        {
          "label": "",
          "prompt": "",
          "marks": 0,
          "code": "temperature(room1, high).\ntemperature(room2, normal).\nsmoke(room1, yes).\nsmoke(room2, no).\noccupied(room1, yes).\noccupied(room2, yes).\n\nalarm(X) :- smoke(X, yes), occupied(X, yes).",
          "fields": []
        },
        {
          "label": "(a)",
          "prompt": "Select the query that finds rooms with a high temperature.",
          "marks": 1,
          "fields": [
            {
              "key": "6a",
              "input": "select",
              "options": [
                "temperature(X, high).",
                "temperature(high, X).",
                "high_temperature(X).",
                "temperature(room1, X)."
              ]
            }
          ]
        },
        {
          "label": "(b)",
          "prompt": "State the result returned by the query temperature(X, high).",
          "marks": 1,
          "fields": [
            {
              "key": "6b",
              "input": "short",
              "placeholder": "X = ..."
            }
          ]
        },
        {
          "label": "(c)",
          "prompt": "Complete the rule that produces alarm(X) when smoke is detected and the room is occupied.",
          "marks": 3,
          "code": "[ A ] :- [ B ], [ C ].",
          "fields": [
            {
              "key": "6c_A",
              "input": "select",
              "label": "Blank A",
              "options": [
                "alarm(X)",
                "smoke(X, yes)",
                "occupied(X, yes)",
                "temperature(X, high)"
              ]
            },
            {
              "key": "6c_B",
              "input": "select",
              "label": "Blank B",
              "options": [
                "smoke(X, yes)",
                "smoke(X, no)",
                "occupied(X, no)",
                "temperature(X, high)"
              ]
            },
            {
              "key": "6c_C",
              "input": "select",
              "label": "Blank C",
              "options": [
                "occupied(X, yes)",
                "occupied(X, no)",
                "smoke(X, no)",
                "temperature(X, normal)"
              ]
            }
          ]
        },
        {
          "label": "(d)",
          "prompt": "Write a new rule evacuate(X) that is true when alarm(X) is true and occupied(X, yes) is true. Use Prolog-style or equivalent declarative notation.",
          "marks": 3,
          "fields": [
            {
              "key": "6d",
              "input": "code",
              "placeholder": "evacuate(X) :- ..."
            }
          ]
        },
        {
          "label": "(e)",
          "prompt": "For the given facts, state whether alarm(room1) is true or false.",
          "marks": 1,
          "fields": [
            {
              "key": "6e",
              "input": "select",
              "options": [
                "TRUE",
                "FALSE"
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 7,
      "title": "Programming problem",
      "topic": "Grade 11/12 · programming and testing",
      "intro": "Write pseudocode or code in a programming language you studied.",
      "parts": [
        {
          "label": "(a)",
          "prompt": "A teacher enters six test scores. Each score must be an integer from 0 to 100 inclusive. Write an algorithm that repeatedly requests a score until it is valid, processes exactly six valid scores, counts how many scores are at least 50, calculates the average of the six valid scores, and outputs the average and pass count.",
          "marks": 6,
          "fields": [
            {
              "key": "7a",
              "input": "code",
              "placeholder": "Write your complete solution here."
            }
          ]
        },
        {
          "label": "(b)",
          "prompt": "For the input validation in part (a), select one suitable extreme value and one suitable erroneous value.",
          "marks": 2,
          "fields": [
            {
              "key": "7b_extreme",
              "input": "select",
              "label": "Extreme value",
              "options": [
                "0",
                "50",
                "75",
                "-1",
                "101"
              ]
            },
            {
              "key": "7b_err",
              "input": "select",
              "label": "Erroneous value",
              "options": [
                "0",
                "50",
                "100",
                "-1",
                "75"
              ]
            }
          ]
        }
      ]
    }
  ]
};
