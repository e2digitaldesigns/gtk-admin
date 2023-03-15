import styled from "styled-components";

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #dddddd;

  td,
  th {
    text-align: left;
    padding: 8px;
  }

  td {
    border-bottom: 1px solid #dddddd;
  }

  tr:nth-child(even) {
    background-color: #efefef;
  }
`;
