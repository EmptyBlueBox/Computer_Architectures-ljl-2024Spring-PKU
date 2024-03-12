; 设置数据段和堆栈段
DATA_SEG SEGMENT
    INFO DB 'Name: Zeyi Zhang & SID: 2000013089$'
    Out1 DB  'Yes!Location: $'
    Out2 DB  'No...$'
    BUFFER DB  100
    STRING DB  100  DUP(0)
DATA_SEG ENDS

STACK_SEG SEGMENT STACK
    STA DB  50 DUP(0)  
STACK_SEG ENDS 

; 设置代码段
CODE_SEG SEGMENT
    ASSUME CS:CODE_SEG, DS:DATA_SEG, SS:STACK_SEG
    BEGIN:  
        MOV AX, DATA_SEG
        MOV ES, AX ; 将堆栈段地址存入 ES 寄存器
        MOV AX, DATA_SEG
        MOV DS, AX ; 将数据段地址存入 DS 寄存器
        MOV AX, STACK_SEG
        MOV SS, AX ; 将堆栈段地址存入 SS 寄存器
        
        MOV DX, OFFSET BUFFER ; 将输入的字符串存在BUFFER中
        MOV AH, 0AH
        INT 21H

    INPUT: 
        MOV DL, 0DH ; 将回车符存储在DL寄存器中
        MOV AH, 02H ; 打印字符 
        INT 21H 
        MOV DL, 0AH ; 将换行符存储在DL寄存器中
        MOV AH, 02H ; 打印字符 
        INT 21H

        MOV AH, 07H ; 输入查询的单个字符
        INT 21H
        CMP AL, 1BH ; 判断是否结束
        JNE MAIN

        MOV DX, OFFSET INFO
        MOV AH, 09H ; 9号：出现字符串
        INT 21H ; 调用 DOS 功能中断
        MOV AX, 4C00H
        INT 21H ; 调用 DOS 功能中断

    MAIN: 
        MOV DI, OFFSET STRING
        MOV BX, OFFSET BUFFER
        CLD ; 将标志寄存器的df位置为0，确保REPNE SCASB指令向前搜索
        MOV CL, BYTE PTR[BX] ; 将BUFFER中的第一个字节（用于存储输入的长度）存储在CL寄存器中
        MOV CH, 0
        REPNE SCASB ; 从BX寄存器指向的地址开始向前搜索，直到找到与AL寄存器相等的字节或搜索完整个字符串
        JZ Yeah

        MOV DX, OFFSET Out2
        MOV AH, 09H ; 打印字符chuan
        INT 21H

        JMP INPUT

    Yeah:   
        MOV DX, OFFSET Out1
        MOV AH, 09H ; 打印字符chuan
        INT 21H

        MOV DX, [BX] 
        SUB DX, CX ; 将找到的字符串的地址减去BUFFER中的偏移量，得到字符串在BUFFER中的位置
        DEC DX
        ADD DX, 30H     
        MOV AH, 02H ; 打印字符
        INT 21H 

        JMP INPUT   

CODE_SEG ENDS
    END BEGIN