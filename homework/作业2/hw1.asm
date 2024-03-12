; 设置数据段和堆栈段
DATA_SEG SEGMENT
    Captal DB 'Alpha $Bravo $China $Delta $Echo $Foxtrot $Golf $Hotel $India $Juliet $Kilo $Lima $Mary $November $Oscar $Paper $Quebec $Research $Sierra $Tango $Uniform $Victor $Whisky $X-ray $Yankee $Zulu $'
    Num DB 'Zero $First $Second $Third $Fourth $Fifth $Sixth $Seventh $Eighth $Ninth $'
    SmallL DB 'alpha $bravo $china $delta $echo $foxtrot $golf $hotel $india $jupiet $kilo $lima $mary $november $oscar $paper $quebec $research $sierra $tango $uniform $victor $whisky $x-ray $yankee $zulu $'

    Cap_OFF DW 0, 7, 14, 21, 28, 34, 43, 49, 56, 63, 71, 77, 83, 89, 99, 106, 113, 121, 131, 139, 146, 155, 163, 171, 178, 186
    Num_OFF DW 0, 6, 13, 21, 28, 36, 43, 50, 59, 67
    Small_OFF DW 0, 7, 14, 21, 28, 34, 43, 49, 56, 63, 71, 77, 83, 89, 99, 106, 113, 121, 131, 139, 146, 155, 163, 171, 178, 186

    INFO DB 'Name: Zeyi Zhang & SID: 2000013089$'
DATA_SEG ENDS

STACK_SEG SEGMENT STACK
    STA DB 50 DUP(0)  
STACK_SEG ENDS 

; 设置代码段
CODE_SEG SEGMENT
    ASSUME CS:CODE_SEG, DS:DATA_SEG, SS:STACK_SEG
    BEGIN:  
        MOV AX, DATA_SEG
        MOV DS, AX ; 将数据段地址存入 DS 寄存器
        MOV AX, STACK_SEG
        MOV SS, AX ; 将堆栈段地址存入 SS 寄存器

    INPUT: 
        MOV AH, 07H ; 直接键盘输入
        INT 21H ; 调用 DOS 功能中断

        CMP AL, 1BH ; 判断是否按下 ESC 键
        JNE HANDLE

        MOV DL, 0DH ; 将回车符存储在DL寄存器中
        MOV AH, 02H ; 打印字符 
        INT 21H 
        MOV DL, 0AH ; 将换行符存储在DL寄存器中
        MOV AH, 02H ; 打印字符 
        INT 21H
        MOV DX, OFFSET INFO
        MOV AH, 09H ; 9号：出现字符串
        INT 21H ; 调用 DOS 功能中断
        MOV AX, 4C00H
        INT 21H ; 调用 DOS 功能中断
        MOV DL, 0DH ; 将回车符存储在DL寄存器中
        MOV AH, 02H ; 打印字符 
        INT 21H 
        MOV DL, 0AH ; 将换行符存储在DL寄存器中
        MOV AH, 02H ; 打印字符 
        INT 21H

    HANDLE: 
        CMP AL, '9'
        JLE Num_HANDLE ; 先判断是否为数字
        CMP AL, 'Z'
        JLE Cap_HANDLE ; 再判断是否为大写字母
        CMP AL, 'z'
        JLE Small_HANDLE ; 最后判断是否为小写字母
        JMP DEFACapT

    Num_HANDLE: 
        CMP AL, '0'
        JL DEFACapT ; 如果不是数字，跳转到 DEFACapT 标签
        MOV CX, 0AH ; 将 CX 寄存器设置为 10 以确定最大loop次数
        MOV BX, 0AH 
    Num_LOOP:   
        DEC BX ; 将 CX 寄存器减 1
        MOV DX, '0' ; 将 DX 寄存器设置为 '0'
        ADD DX, BX ; 将 DX 寄存器加上 CX 寄存器的值
        CMP DL, AL ; 比较输入的字符和 DX 寄存器的值
        JE Num_OUTPUT 
        LOOP Num_LOOP
    Num_OUTPUT:
        MOV AX, BX 
        ADD AX, AX ; 将 AX 寄存器乘以 2
        MOV BX, OFFSET Num_OFF ; 将 BX 寄存器设置为 Num_OFF 的地址
        ADD BX, AX ; 将 BX 寄存器加上 AX 寄存器的值
        MOV AX, [BX] ; 将 AX 寄存器设置为 BX 寄存器指向的值
        MOV DX, OFFSET Num ; 将 DX 寄存器设置为 Num 的地址
        ADD DX, AX ; 将 DX 寄存器加上 AX 寄存器的值
        JMP OUTPUT 
                
    Cap_HANDLE:  
        CMP AL, 'A'
        JL DEFACapT ; 如果不是大写字母，跳转到 DEFACapT 标签
        MOV CX, 1BH ; 将 CX 寄存器设置为 26 以确定最大loop次数
        MOV BX, 1BH
    Cap_LOOP:   
        DEC BX ; 将 CX 寄存器减 1
        MOV DX, 'A' ; 将 DX 寄存器设置为 'A'
        ADD DX, BX ; 将 DX 寄存器加上 CX 寄存器的值
        CMP DL, AL ; 比较输入的字符和 DX 寄存器的值
        JE Cap_OUTPUT 
        LOOP Cap_LOOP
    Cap_OUTPUT:
        MOV AX, BX 
        ADD AX, AX ; 将 AX 寄存器乘以 2
        MOV BX, OFFSET Cap_OFF ; 将 BX 寄存器设置为 Num_OFF 的地址
        ADD BX, AX ; 将 BX 寄存器加上 AX 寄存器的值
        MOV AX, [BX] ; 将 AX 寄存器设置为 BX 寄存器指向的值
        MOV DX, OFFSET Captal ; 将 DX 寄存器设置为 Num 的地址
        ADD DX, AX ; 将 DX 寄存器加上 AX 寄存器的值
        JMP OUTPUT 

    Small_HANDLE:  
        CMP AL, 'a'
        JL DEFACapT ; 如果不是大写字母，跳转到 DEFACapT 标签
        MOV CX, 1BH ; 将 CX 寄存器设置为 26 以确定最大loop次数
        MOV BX, 1BH
    Small_LOOP:   
        DEC BX ; 将 CX 寄存器减 1
        MOV DX, 'a' ; 将 DX 寄存器设置为 'a'
        ADD DX, BX ; 将 DX 寄存器加上 CX 寄存器的值
        CMP DL, AL ; 比较输入的字符和 DX 寄存器的值
        JE Small_OUTPUT 
        LOOP Small_LOOP
    Small_OUTPUT:
        MOV AX, BX 
        ADD AX, AX ; 将 AX 寄存器乘以 2
        MOV BX, OFFSET Small_OFF ; 将 BX 寄存器设置为 Num_OFF 的地址
        ADD BX, AX ; 将 BX 寄存器加上 AX 寄存器的值
        MOV AX, [BX] ; 将 AX 寄存器设置为 BX 寄存器指向的值
        MOV DX, OFFSET SmallL ; 将 DX 寄存器设置为 Num 的地址
        ADD DX, AX ; 将 DX 寄存器加上 AX 寄存器的值
        JMP OUTPUT 

    DEFACapT:    
        MOV DL, '?'
        MOV AH, 02H ; 2号：显示字符输出
        INT 21H ; 调用 DOS 功能中断
        JMP INPUT

    OUTPUT:     
        MOV AH, 09H ; 9号：出现字符串
        INT 21H ; 调用 DOS 功能中断
        JMP INPUT

CODE_SEG ENDS
    END BEGIN