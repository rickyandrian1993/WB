import React from 'react'
import { ContentTtd } from '../../ReportStyles'

export default function TtdPdf() {
  return (
    <ContentTtd>
      <table>
        <tbody>
          <tr>
            <td>Diketahui Oleh</td>
            <td>Diperiksa Oleh</td>
            <td>Dibuat Oleh</td>
          </tr>
          <tr>
            <td>____________________</td>
            <td>____________________</td>
            <td>____________________</td>
          </tr>
          <tr>
            <td>Mill Manager</td>
            <td>FC/Auditor WB</td>
            <td>Operator WB</td>
          </tr>
        </tbody>
      </table>
    </ContentTtd>
  )
}
