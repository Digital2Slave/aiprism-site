# VB学习第十周素数判断，随机数产生




```
     Public Class Form1
        Private Sub TextBox1_KeyPress(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyPressEventArgs) Handles TextBox1.KeyPress
            If Asc(e.KeyChar) = 13 Then
                Dim i, m As Integer, Tag As Boolean
                m = Val(TextBox1.Text)
                Tag = True

                i = 2
                Do
                    If (m Mod i) = 0 Then
                        Tag = False
                        Label2.Text = m & "不是素数"
                        Exit Do
                    End If
                    i = i + 1
                Loop While (2 <= i And i <= m - 1)
                If i = m Then Label2.Text = m & "是素数"
            End If
        End Sub

        Private Sub TextBox1_TextChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles TextBox1.TextChanged

        End Sub
    End Class
```



  
随机数产生！


```
    Public Class Form1

        Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
            Dim i, a, s, max, min As Integer
            max = 1 : min = 100
            Label1.Text = ""
            For i = 1 To 10
                a = Int(Rnd() * 100 + 1)
                Label1.Text &= a & "  "
                If a > max Then max = a
                If a < min Then min = a
                s = s + a
            Next
            Label3.Text = max & Space(15) & min & Space(15) & s / 10
        End Sub
    End Class
```



  