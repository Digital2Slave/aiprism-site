# VB学习第十三周几种常见程序源代码




```
    '(1)
    Public Class Form1
        Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
            Dim x() = {4, 5, 3, 6, 1}
            Dim i As Integer
            Label1.Text = ""
            For i = 0 To UBound(x)
                Label1.Text &= Space(4) & x(i)
            Next
        End Sub
    End Class
    '(2)
    Public Class Form1
        Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
            Dim x(9), y(9), z(9), i As Integer
            For i = 0 To UBound(x)
                x(i) = Int(Rnd() * (40 - 20 + 1) + 20)
                y(i) = Int(Rnd() * (40 - 20 + 1) + 20)
                z(i) = x(i) - y(i)
            Next
            Label4.Text = "" : Label5.Text = "" : Label6.Text = ""
            For i = 0 To UBound(x)
                Label4.Text &= Space(6 - Len(Str(x(i)))) & Str(x(i))
                Label5.Text &= Space(6 - Len(Str(y(i)))) & Str(y(i))
                Label6.Text &= Space(6 - Len(Str(z(i)))) & Str(z(i))
            Next
        End Sub
    End Class
    '(5)
    Public Class Form1
        Dim scores(9) As Single
        Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
            Dim i As Integer
            For i = 0 To UBound(scores)
                scores(i) = InputBox("请输入第" & Str(i + 1) & "个评委的打分(0～10)", "评委打分")
            Next
        End Sub

        Private Sub Button2_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button2.Click
            Dim result, smin, smax As Single
            Dim i As Integer
            result = 0 : smin = 10 : smax = 0
            For i = 0 To UBound(scores)
                If (scores(i) < smin) Then smin = scores(i)
                If (scores(i) > smax) Then smax = scores(i)
                result += scores(i)
            Next
            TextBox1.Text = Format((result - smin - smax) / 8, "0.0")
            'TextBox1.Text = Str((result - smin - smax) / 8)
        End Sub
    End Class
    '(6)
    Public Class Form1
        Private Sub TextBox1_KeyPress(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyPressEventArgs) Handles TextBox1.KeyPress
            Dim i, j, n As Integer
            If Asc(e.KeyChar) = 13 Then
                n = Val(TextBox1.Text)
                Dim a(n, n) As Integer
                For i = 1 To n                                     ' 形成杨辉三角形
                    For j = 1 To i
                        a(i, j) = a(i - 1, j) + a(i - 1, j - 1)
                        If i = j Then a(i, j) = 1
                    Next
                Next
                Label1.Text = ""
                For i = 1 To n                                      ' 显示右图
                    Label1.Text &= Space(20 - i * 2)
                    For j = 1 To i
                        Label1.Text &= a(i, j) & Space(5 - Len(Str(a(i, j))))
                    Next
                    Label1.Text &= vbCrLf
                Next
            End If
        End Sub
    End Class
    '(7)
    Public Class Form1
        Private Sub TextBox3_KeyPress(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyPressEventArgs) Handles TextBox3.KeyPress
            Dim jsjResult As Single
            If Asc(e.KeyChar) = 13 Then
                Select Case ComboBox1.Text
                    Case "＋"
                        jsjResult = Val(TextBox1.Text) + Val(TextBox2.Text)
                    Case "－"
                        jsjResult = Val(TextBox1.Text) - Val(TextBox2.Text)
                    Case "×"
                        jsjResult = Val(TextBox1.Text) * Val(TextBox2.Text)
                    Case "÷"
                        jsjResult = Val(TextBox1.Text) / Val(TextBox2.Text)
                End Select

                If jsjResult = Val(TextBox3.Text) Then
                    Label2.Text = "恭喜答案正确"
                Else
                    Label2.Text = "错误，正确答案为" & jsjResult
                End If
            End If
        End Sub
    End Class
```



  