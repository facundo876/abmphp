<?php
      interface IArchivo
      {
          function GuardarEnArchivo($nombreArchivo): void;
  
          function TraerDeArchivo($nombreArchivo): void;
      }