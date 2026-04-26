"""
Servicio para impresión y generación de PDFs usando reportlab.
Genera actas, PRCC y dictámenes periciales.
"""

import json
from pathlib import Path
from typing import Optional, Any
from datetime import datetime

from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    Image, PageBreak, KeepTogether
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY


class PrintService:
    """Servicio para generación de documentos PDF e impresión."""
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Configura estilos personalizados."""
        # Título principal
        self.styles.add(ParagraphStyle(
            name='TituloPrincipal',
            parent=self.styles['Heading1'],
            fontSize=16,
            textColor=colors.HexColor('#1a365d'),
            spaceAfter=12,
            alignment=TA_CENTER
        ))
        
        # Subtítulo de sección
        self.styles.add(ParagraphStyle(
            name='Subtitulo',
            parent=self.styles['Heading2'],
            fontSize=12,
            textColor=colors.HexColor('#2c5282'),
            spaceAfter=8,
            alignment=TA_LEFT
        ))
        
        # Texto normal justificado
        self.styles.add(ParagraphStyle(
            name='TextoJustificado',
            parent=self.styles['Normal'],
            fontSize=10,
            alignment=TA_JUSTIFY,
            spaceAfter=6
        ))
        
        # Texto pequeño para labels
        self.styles.add(ParagraphStyle(
            name='Label',
            parent=self.styles['Normal'],
            fontSize=9,
            textColor=colors.HexColor('#4a5568'),
            spaceAfter=4
        ))
    
    def generar_acta_consignacion(self, datos: dict, ruta_salida: str) -> str:
        """
        Genera Acta de Obtención por Consignación.
        
        Args:
            datos: Diccionario con datos del formulario
            ruta_salida: Ruta completa del archivo PDF a generar
            
        Returns:
            Ruta del archivo generado
        """
        doc = SimpleDocTemplate(ruta_salida, pagesize=letter)
        story = []
        
        # Encabezado
        story.append(Paragraph("ACTA DE OBTENCIÓN POR CONSIGNACIÓN", self.styles['TituloPrincipal']))
        story.append(Spacer(1, 0.3*inch))
        
        # Número de caso
        story.append(Paragraph(f"Número de Caso: <b>{datos.get('numero_caso', 'N/A')}</b>", self.styles['Subtitulo']))
        story.append(Spacer(1, 0.2*inch))
        
        # Datos del consignante
        story.append(Paragraph("I. DATOS DEL CONSIGNANTE", self.styles['Subtitulo']))
        datos_consignante = [
            ["Nombre:", datos.get('consignante_nombre', '')],
            ["Cédula de Identidad:", datos.get('consignante_ci', '')],
            ["Motivo de Consignación:", datos.get('motivo_consignacion', '')]
        ]
        tabla_consignante = Table(datos_consignante, colWidths=[2*inch, 4*inch])
        tabla_consignante.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(tabla_consignante)
        story.append(Spacer(1, 0.3*inch))
        
        # Datos del dispositivo
        story.append(Paragraph("II. DATOS DEL DISPOSITIVO", self.styles['Subtitulo']))
        datos_dispositivo = [
            ["Marca:", datos.get('marca', '')],
            ["Modelo:", datos.get('modelo', '')],
            ["IMEI 1:", datos.get('imei', '')],
            ["IMEI 2:", datos.get('imei2', '')],
            ["Número Telefónico:", datos.get('numero_telefonico', '')],
            ["Estado Físico:", datos.get('estado_fisico', '')],
            ["Estado Pantalla:", datos.get('estado_pantalla', '')],
            ["Estado Batería:", datos.get('estado_bateria', '')]
        ]
        tabla_dispositivo = Table(datos_dispositivo, colWidths=[2*inch, 4*inch])
        tabla_dispositivo.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(tabla_dispositivo)
        story.append(Spacer(1, 0.3*inch))
        
        # Funcionario receptor
        story.append(Paragraph("III. FUNCIONARIO RECEPTOR", self.styles['Subtitulo']))
        story.append(Paragraph(f"Funcionario: <b>{datos.get('funcionario', '')}</b>", self.styles['TextoJustificado']))
        story.append(Spacer(1, 0.5*inch))
        
        # Firmas
        story.append(Spacer(1, 0.5*inch))
        linea_firma = "__________________________"
        firma_data = [
            [linea_firma, linea_firma],
            ["Consignante", "Funcionario Receptor"],
            [f"C.I.: {datos.get('consignante_ci', '')}", f"C.I.: {datos.get('funcionario_ci', '')}"]
        ]
        tabla_firmas = Table(firma_data, colWidths=[3*inch, 3*inch])
        tabla_firmas.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 1), (-1, 2), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('TOPPADDING', (0, 0), (-1, -1), 20),
        ]))
        story.append(tabla_firmas)
        
        # Fecha
        story.append(Spacer(1, 0.5*inch))
        fecha_actual = datetime.now().strftime("%d/%m/%Y %H:%M")
        story.append(Paragraph(f"Fecha: {fecha_actual}", self.styles['Label']))
        
        doc.build(story)
        return ruta_salida
    
    def generar_prcc(self, datos: dict, ruta_salida: str) -> str:
        """
        Genera Planilla de Registro de Cadena de Custodia (PRCC).
        
        Args:
            datos: Diccionario con datos de la PRCC
            ruta_salida: Ruta completa del archivo PDF a generar
            
        Returns:
            Ruta del archivo generado
        """
        doc = SimpleDocTemplate(ruta_salida, pagesize=letter)
        story = []
        
        # Encabezado
        story.append(Paragraph("PLANILLA DE REGISTRO DE CADENA DE CUSTODIA", self.styles['TituloPrincipal']))
        story.append(Paragraph("(PRCC)", self.styles['Subtitulo']))
        story.append(Spacer(1, 0.3*inch))
        
        # Número PRCC y expediente
        info_header = [
            ["N° PRCC:", datos.get('numero_prcc', '')],
            ["N° Expediente:", datos.get('expediente_numero', '')]
        ]
        tabla_header = Table(info_header, colWidths=[1.5*inch, 4.5*inch])
        tabla_header.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('BOX', (0, 0), (-1, -1), 1, colors.black),
        ]))
        story.append(tabla_header)
        story.append(Spacer(1, 0.3*inch))
        
        # Datos del órgano instructor
        story.append(Paragraph("I. ÓRGANO QUE INSTRUYE", self.styles['Subtitulo']))
        datos_organo = [
            ["Despacho:", datos.get('despacho_instruye', '')],
            ["Órgano:", datos.get('organo_instruye', '')]
        ]
        tabla_organo = Table(datos_organo, colWidths=[2*inch, 4*inch])
        tabla_organo.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(tabla_organo)
        story.append(Spacer(1, 0.3*inch))
        
        # Datos del funcionario colector
        story.append(Paragraph("II. FUNCIONARIO COLECTOR", self.styles['Subtitulo']))
        datos_funcionario = [
            ["Nombre:", datos.get('funcionario_colector', '')],
            ["Cargo:", datos.get('cargo', '')],
            ["Órgano:", datos.get('organo', '')]
        ]
        tabla_funcionario = Table(datos_funcionario, colWidths=[2*inch, 4*inch])
        tabla_funcionario.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(tabla_funcionario)
        story.append(Spacer(1, 0.3*inch))
        
        # Descripción de la evidencia
        story.append(Paragraph("III. DESCRIPCIÓN DE LA EVIDENCIA", self.styles['Subtitulo']))
        datos_evidencia = [
            ["Tipo Objeto:", datos.get('tipo_objeto', 'Dispositivo Móvil')],
            ["Marca:", datos.get('marca', '')],
            ["Modelo:", datos.get('modelo', '')],
            ["IMEI:", datos.get('imei', '')],
            ["IMEI 2:", datos.get('imei2', '')],
            ["Color:", datos.get('color', '')],
            ["Descripción:", datos.get('descripcion_evidencia', '')]
        ]
        tabla_evidencia = Table(datos_evidencia, colWidths=[2*inch, 4*inch])
        tabla_evidencia.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        story.append(tabla_evidencia)
        story.append(Spacer(1, 0.3*inch))
        
        # Embalaje y precintos
        story.append(Paragraph("IV. EMBALAJE Y PRECINTOS", self.styles['Subtitulo']))
        datos_embalaje = [
            ["Tipo Embalaje:", datos.get('tipo_embalaje', '')],
            ["N° Precinto:", datos.get('numero_precinto', '')],
            ["Estado Embalaje:", datos.get('estado_embalaje', 'buenas')]
        ]
        tabla_embalaje = Table(datos_embalaje, colWidths=[2*inch, 4*inch])
        tabla_embalaje.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(tabla_embalaje)
        story.append(Spacer(1, 0.3*inch))
        
        # Hashes criptográficos
        story.append(Paragraph("V. HASHES CRIPTOGRÁFICOS", self.styles['Subtitulo']))
        datos_hashes = [
            ["SHA-256:", datos.get('hash_sha256', 'N/A')],
            ["MD5:", datos.get('hash_md5', 'N/A')]
        ]
        tabla_hashes = Table(datos_hashes, colWidths=[1.5*inch, 4.5*inch])
        tabla_hashes.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('WORDWRAP', (1, 0), (1, -1), True),
        ]))
        story.append(tabla_hashes)
        story.append(Spacer(1, 0.3*inch))
        
        # Firmas
        story.append(Spacer(1, 0.5*inch))
        linea_firma = "__________________________"
        firma_data = [
            [linea_firma],
            [datos.get('nombre_firmante', 'Funcionario Colector')],
            ["Huella Dactilar"]
        ]
        tabla_firmas = Table(firma_data, colWidths=[4*inch])
        tabla_firmas.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 1), (-1, 2), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('TOPPADDING', (0, 0), (-1, 0), 30),
        ]))
        story.append(tabla_firmas)
        
        # Fecha
        story.append(Spacer(1, 0.5*inch))
        fecha_actual = datetime.now().strftime("%d/%m/%Y %H:%M")
        story.append(Paragraph(f"Fecha: {fecha_actual}", self.styles['Label']))
        
        doc.build(story)
        return ruta_salida
    
    def generar_dictamen_pericial(self, datos: dict, ruta_salida: str) -> str:
        """
        Genera Dictamen Pericial completo.
        
        Args:
            datos: Diccionario con datos del dictamen
            ruta_salida: Ruta completa del archivo PDF a generar
            
        Returns:
            Ruta del archivo generado
        """
        doc = SimpleDocTemplate(ruta_salida, pagesize=letter)
        story = []
        
        # Encabezado
        story.append(Paragraph("DICTAMEN PERICIAL", self.styles['TituloPrincipal']))
        story.append(Paragraph("Sistema Forense Android", self.styles['Subtitulo']))
        story.append(Spacer(1, 0.3*inch))
        
        # Número y fecha
        info_header = [
            ["N° Dictamen:", datos.get('numero_dictamen', 'N/A')],
            ["Fecha Emisión:", datos.get('fecha_emision', datetime.now().strftime("%d/%m/%Y"))]
        ]
        tabla_header = Table(info_header, colWidths=[2*inch, 4*inch])
        tabla_header.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(tabla_header)
        story.append(Spacer(1, 0.3*inch))
        
        # I. Motivo
        story.append(Paragraph("I. MOTIVO", self.styles['Subtitulo']))
        motivo = datos.get('motivo', 'No especificado')
        story.append(Paragraph(motivo, self.styles['TextoJustificado']))
        story.append(Spacer(1, 0.3*inch))
        
        # II. Descripción de la Evidencia
        story.append(Paragraph("II. DESCRIPCIÓN DE LA EVIDENCIA", self.styles['Subtitulo']))
        descripcion = datos.get('descripcion_evidencia', 'No especificada')
        story.append(Paragraph(descripcion, self.styles['TextoJustificado']))
        story.append(Spacer(1, 0.3*inch))
        
        # III. Exámenes Practicados
        story.append(Paragraph("III. EXÁMENES PRACTICADOS", self.styles['Subtitulo']))
        examenes = datos.get('examenes_practicados', [])
        if isinstance(examenes, str):
            examenes = json.loads(examenes)
        
        if examenes:
            for examen in examenes:
                examen_data = [
                    ["Herramienta:", examen.get('herramienta', 'N/A')],
                    ["Versión:", examen.get('version', 'N/A')],
                    ["Tipo Extracción:", examen.get('tipo_extraccion', 'N/A')],
                    ["Hash Origen SHA-256:", examen.get('hash_origen_sha256', 'N/A')],
                    ["Hash Copia SHA-256:", examen.get('hash_copia_sha256', 'N/A')],
                    ["Hash Origen MD5:", examen.get('hash_origen_md5', 'N/A')],
                    ["Hash Copia MD5:", examen.get('hash_copia_md5', 'N/A')]
                ]
                tabla_examen = Table(examen_data, colWidths=[2.5*inch, 3.5*inch])
                tabla_examen.setStyle(TableStyle([
                    ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, -1), 9),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                    ('WORDWRAP', (1, 0), (1, -1), True),
                ]))
                story.append(tabla_examen)
                story.append(Spacer(1, 0.2*inch))
        story.append(Spacer(1, 0.3*inch))
        
        # IV. Resultados Obtenidos
        story.append(Paragraph("IV. RESULTADOS OBTENIDOS", self.styles['Subtitulo']))
        resultados = datos.get('resultados_json', {})
        if isinstance(resultados, str):
            resultados = json.loads(resultados)
        
        if resultados and 'evidencias' in resultados:
            evidencias = resultados['evidencias']
            headers = ['Nombre', 'Fecha Creación', 'Tamaño', 'Hash SHA-256']
            data = [headers]
            for ev in evidencias[:10]:  # Máximo 10 evidencias
                data.append([
                    ev.get('nombre_nativo', ''),
                    ev.get('fecha_creacion', '')[:10] if ev.get('fecha_creacion') else '',
                    f"{ev.get('tamanio_bytes', 0) / 1024:.2f} KB",
                    ev.get('hash_sha256', '')[:16] + '...'
                ])
            
            tabla_resultados = Table(data, colWidths=[2*inch, 1.5*inch, 1*inch, 2*inch])
            tabla_resultados.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2c5282')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 8),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
                ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ]))
            story.append(tabla_resultados)
        story.append(Spacer(1, 0.3*inch))
        
        # V. Conclusiones
        story.append(Paragraph("V. CONCLUSIONES", self.styles['Subtitulo']))
        conclusiones = datos.get('conclusiones', 'No especificadas')
        story.append(Paragraph(conclusiones, self.styles['TextoJustificado']))
        story.append(Spacer(1, 0.3*inch))
        
        # VI. Consumo de Evidencia
        story.append(Paragraph("VI. CONSUMO DE EVIDENCIA", self.styles['Subtitulo']))
        consumo_tipo = datos.get('consumo_evidencia', 'no_alterado')
        consumo_desc = {
            'no_alterado': 'No se alteró la data original (técnicas de solo lectura)',
            'consumo_parcial': f'Hubo consumo parcial: {datos.get("consumo_especificacion", "")}'
        }
        story.append(Paragraph(consumo_desc.get(consumo_tipo, 'N/A'), self.styles['TextoJustificado']))
        story.append(Spacer(1, 0.3*inch))
        
        # Fundamentación Legal
        story.append(Paragraph("VII. FUNDAMENTACIÓN LEGAL", self.styles['Subtitulo']))
        fundamentacion = datos.get('fundamentacion_legal', [])
        if isinstance(fundamentacion, str):
            fundamentacion = json.loads(fundamentacion)
        
        for ley in fundamentacion:
            story.append(Paragraph(f"• {ley}", self.styles['TextoJustificado']))
        story.append(Spacer(1, 0.3*inch))
        
        # Firmas
        story.append(Spacer(1, 0.5*inch))
        linea_firma = "__________________________"
        firma_data = [
            [linea_firma],
            [datos.get('perito_actuante', 'Perito Actuante')],
            [f"Credencial: {datos.get('credencial_numero', 'N/A')}"],
            ["Perito Informático"]
        ]
        tabla_firmas = Table(firma_data, colWidths=[4*inch])
        tabla_firmas.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 1), (-1, 3), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('TOPPADDING', (0, 0), (-1, 0), 30),
        ]))
        story.append(tabla_firmas)
        
        doc.build(story)
        return ruta_salida
    
    def imprimir_documento(self, html_content: str, parent_widget=None) -> bool:
        """
        Imprime un documento HTML usando QPrintDialog.
        
        Args:
            html_content: Contenido HTML a imprimir
            parent_widget: Widget padre para el diálogo
            
        Returns:
            True si se imprimió, False si se canceló
        """
        try:
            from PyQt6.QtPrintSupport import QPrinter, QPrintDialog
            from PyQt6.QtGui import QTextDocument
            
            printer = QPrinter(QPrinter.PrinterMode.HighResolution)
            dialog = QPrintDialog(printer, parent_widget)
            
            if dialog.exec() == QPrintDialog.DialogCode.Accepted:
                doc = QTextDocument()
                doc.setHtml(html_content)
                doc.print(printer)
                return True
            return False
        except ImportError:
            print("PyQt6 no disponible para impresión")
            return False


# Instancia singleton
_print_service_instance: Optional[PrintService] = None


def get_print_service() -> PrintService:
    """Obtiene la instancia singleton del servicio de impresión."""
    global _print_service_instance
    if _print_service_instance is None:
        _print_service_instance = PrintService()
    return _print_service_instance
