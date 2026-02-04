# VB学习第十二周输出显示n以内的素数




```
    '(3)输出显示n以内的素数1
    Public Class Form1
        Private Sub TextBox1_KeyPress(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyPressEventArgs) Handles TextBox1.KeyPress
            Dim i, n, m As Integer, Tag As Boolean
            Dim x() = {0}
            If Asc(e.KeyChar) = 13 Then
                If Not IsNumeric(TextBox1.Text) Then
                    TextBox1.Text = ""
                    TextBox1.Focus()
                Else
                    m = Val(TextBox1.Text)
                    For n = 3 To m
                        Tag = True
                        For i = 2 To n - 1
                            If (n Mod i) = 0 Then Tag = False
                        Next
                        If Tag Then
                            If x(0) = 0 Then
                                x(0) = n
                            Else
                                ReDim Preserve x(UBound(x) + 1)
                                x(UBound(x)) = n
                            End If
                        End If
                    Next
                End If
                Label3.Text = ""
                If x(0) = 0 Then
                    Label3.Text = Str(m) & "以内没有素数"
                Else
                    For i = 0 To UBound(x)
                        Label3.Text &= Space(5 - Len(Str(x(i)))) & Str(x(i))
                        If ((i + 1) Mod 5 = 0) Then Label3.Text &= vbCrLf
                    Next
                End If
            End If
        End Sub
    End Class
    '(4)输出显示n以内的素数2
    Public Class Form1
        Private Sub TextBox1_KeyPress(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyPressEventArgs) Handles TextBox1.KeyPress
            Dim i, n, m As Integer, Tag As Boolean
            Dim x() = {0}
            If Asc(e.KeyChar) = 13 Then
                If Not IsNumeric(TextBox1.Text) Then
                    TextBox1.Text = ""
                    TextBox1.Focus()
                Else
                    m = Val(TextBox1.Text)
                    For n = 3 To m
                        Tag = True
                        For i = 2 To n - 1
                            If (n Mod i) = 0 Then Tag = False
                        Next
                        If Tag Then
                            If x(0) = 0 Then
                                x(0) = n
                            Else
                                ReDim Preserve x(UBound(x) + 1)
                                x(UBound(x)) = n
                            End If
                        End If
                    Next
                End If
                ListBox1.Items.Clear()
                For i = 0 To UBound(x)
                    ListBox1.Items.Add(x(i))
                Next
            End If
        End Sub
    End Class
```



  