"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { User, Target, Calendar, Utensils, Dumbbell, TrendingUp, Printer, Mail, Send, Apple, ChefHat } from 'lucide-react'

interface UserData {
  nome: string
  idade: number
  peso: number
  altura: number
  sexo: 'masculino' | 'feminino'
  diasTreino: number
  tipoTreino: 'hipertrofia' | 'emagrecimento' | 'resistencia' | 'forca'
  nivel: 'iniciante' | 'intermediario' | 'avancado'
}

interface PlanoTreino {
  dia: string
  grupoMuscular: string
  exercicios: Array<{
    nome: string
    series: string
    repeticoes: string
    descanso: string
  }>
}

interface PlanoDieta {
  calorias: number
  proteinas: number
  carboidratos: number
  gorduras: number
  refeicoes: Array<{
    nome: string
    horario: string
    alimentos: string[]
    calorias: number
  }>
}

interface DietaEspecifica {
  nome: string
  calorias: number
  descricao: string
  beneficios: string[]
  restricoes: string
  refeicoes: Array<{
    nome: string
    horario: string
    alimentos: string[]
    calorias: number
  }>
}

export default function FitnessApp() {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState<UserData>({
    nome: '',
    idade: 0,
    peso: 0,
    altura: 0,
    sexo: 'masculino',
    diasTreino: 3,
    tipoTreino: 'hipertrofia',
    nivel: 'iniciante'
  })
  const [planoTreino, setPlanoTreino] = useState<PlanoTreino[]>([])
  const [planoDieta, setPlanoDieta] = useState<PlanoDieta | null>(null)
  const [dietaSelecionada, setDietaSelecionada] = useState<string>('')
  const [emailData, setEmailData] = useState({
    destinatario: '',
    assunto: '',
    mensagem: ''
  })

  const dietasEspecificas: DietaEspecifica[] = [
    {
      nome: 'Dieta Mediterrânea',
      calorias: 1600,
      descricao: 'Rica em peixes, azeite, frutas e vegetais',
      beneficios: ['Reduz inflamação', 'Melhora saúde cardiovascular', 'Sustentável a longo prazo'],
      restricoes: 'Baixo consumo de carnes vermelhas',
      refeicoes: [
        {
          nome: 'Café da Manhã',
          horario: '07:00',
          alimentos: ['Iogurte grego com mel', '30g nozes', '1 fatia pão integral', 'Café'],
          calorias: 380
        },
        {
          nome: 'Lanche da Manhã',
          horario: '10:00',
          alimentos: ['1 maçã média', '15g amêndoas'],
          calorias: 180
        },
        {
          nome: 'Almoço',
          horario: '12:30',
          alimentos: ['150g salmão grelhado', 'Salada mediterrânea', '2 col. sopa azeite', '100g arroz integral'],
          calorias: 520
        },
        {
          nome: 'Lanche da Tarde',
          horario: '15:30',
          alimentos: ['200ml iogurte natural', '1 col. sopa mel', 'Frutas vermelhas'],
          calorias: 220
        },
        {
          nome: 'Jantar',
          horario: '19:00',
          alimentos: ['120g peito de frango', 'Legumes refogados', 'Salada verde', '1 col. sopa azeite'],
          calorias: 300
        }
      ]
    },
    {
      nome: 'Dieta Low Carb',
      calorias: 1400,
      descricao: 'Redução significativa de carboidratos',
      beneficios: ['Perda de peso rápida', 'Controla glicemia', 'Reduz apetite'],
      restricoes: 'Máximo 50g carboidratos/dia',
      refeicoes: [
        {
          nome: 'Café da Manhã',
          horario: '07:00',
          alimentos: ['3 ovos mexidos', '50g queijo', '1/2 abacate', 'Café sem açúcar'],
          calorias: 420
        },
        {
          nome: 'Lanche da Manhã',
          horario: '10:00',
          alimentos: ['30g castanhas mistas'],
          calorias: 180
        },
        {
          nome: 'Almoço',
          horario: '12:30',
          alimentos: ['180g carne bovina', 'Salada verde', 'Brócolis refogado', '2 col. sopa azeite'],
          calorias: 480
        },
        {
          nome: 'Lanche da Tarde',
          horario: '15:30',
          alimentos: ['200g iogurte integral', '20g nozes'],
          calorias: 200
        },
        {
          nome: 'Jantar',
          horario: '19:00',
          alimentos: ['150g salmão', 'Aspargos grelhados', 'Salada de rúcula', '1 col. sopa azeite'],
          calorias: 320
        }
      ]
    },
    {
      nome: 'Dieta DASH',
      calorias: 1500,
      descricao: 'Focada em reduzir pressão arterial',
      beneficios: ['Controla pressão arterial', 'Rica em nutrientes', 'Flexível'],
      restricoes: 'Baixo sódio',
      refeicoes: [
        {
          nome: 'Café da Manhã',
          horario: '07:00',
          alimentos: ['1 xíc. aveia', '200ml leite desnatado', '1 banana', '1 col. chá mel'],
          calorias: 350
        },
        {
          nome: 'Lanche da Manhã',
          horario: '10:00',
          alimentos: ['1 iogurte natural', '15g amêndoas'],
          calorias: 150
        },
        {
          nome: 'Almoço',
          horario: '12:30',
          alimentos: ['120g peito de frango', '150g batata doce', 'Salada colorida', '100g feijão'],
          calorias: 520
        },
        {
          nome: 'Lanche da Tarde',
          horario: '15:30',
          alimentos: ['1 maçã', '2 col. sopa pasta amendoim'],
          calorias: 220
        },
        {
          nome: 'Jantar',
          horario: '19:00',
          alimentos: ['150g peixe branco', 'Quinoa', 'Vegetais no vapor', 'Salada verde'],
          calorias: 380
        }
      ]
    },
    {
      nome: 'Dieta Cetogênica',
      calorias: 1300,
      descricao: 'Muito baixo carboidrato, alta gordura',
      beneficios: ['Queima gordura eficiente', 'Melhora foco mental', 'Controla epilepsia'],
      restricoes: 'Máximo 20g carboidratos/dia',
      refeicoes: [
        {
          nome: 'Café da Manhã',
          horario: '07:00',
          alimentos: ['Café com 2 col. sopa óleo coco', '3 ovos fritos na manteiga', '50g bacon'],
          calorias: 450
        },
        {
          nome: 'Lanche da Manhã',
          horario: '10:00',
          alimentos: ['30g macadâmias'],
          calorias: 200
        },
        {
          nome: 'Almoço',
          horario: '12:30',
          alimentos: ['150g carne gorda', 'Salada com azeite', 'Abacate', '50g queijo'],
          calorias: 520
        },
        {
          nome: 'Lanche da Tarde',
          horario: '15:30',
          alimentos: ['Fat bomb (coco + cacau)', 'Chá verde'],
          calorias: 180
        },
        {
          nome: 'Jantar',
          horario: '19:00',
          alimentos: ['120g salmão', 'Espinafre refogado na manteiga', 'Salada de pepino'],
          calorias: 350
        }
      ]
    },
    {
      nome: 'Jejum Intermitente 16:8',
      calorias: 1450,
      descricao: '16h jejum, 8h janela alimentar',
      beneficios: ['Melhora metabolismo', 'Facilita déficit calórico', 'Flexível'],
      restricoes: 'Alimentação apenas em 8h do dia',
      refeicoes: [
        {
          nome: 'Primeira Refeição',
          horario: '12:00',
          alimentos: ['150g peito de frango', '100g arroz integral', 'Salada verde', '1 col. sopa azeite'],
          calorias: 480
        },
        {
          nome: 'Lanche',
          horario: '15:00',
          alimentos: ['1 shake whey protein', '1 banana', '30g aveia'],
          calorias: 320
        },
        {
          nome: 'Segunda Refeição',
          horario: '18:00',
          alimentos: ['150g salmão', '150g batata doce', 'Brócolis', 'Salada mista'],
          calorias: 520
        },
        {
          nome: 'Última Refeição',
          horario: '19:30',
          alimentos: ['200g iogurte grego', '30g castanhas', '1 col. sopa mel'],
          calorias: 350
        }
      ]
    }
  ]

  const calcularIMC = () => {
    const alturaM = userData.altura / 100
    return userData.peso / (alturaM * alturaM)
  }

  const calcularTMB = () => {
    // Fórmula de Harris-Benedict
    if (userData.sexo === 'masculino') {
      return 88.362 + (13.397 * userData.peso) + (4.799 * userData.altura) - (5.677 * userData.idade)
    } else {
      return 447.593 + (9.247 * userData.peso) + (3.098 * userData.altura) - (4.330 * userData.idade)
    }
  }

  const gerarPlanoTreino = () => {
    const exerciciosPorGrupo = {
      peito: [
        { nome: 'Supino Reto', series: '4', repeticoes: '8-12', descanso: '90s' },
        { nome: 'Supino Inclinado', series: '3', repeticoes: '10-12', descanso: '90s' },
        { nome: 'Crucifixo', series: '3', repeticoes: '12-15', descanso: '60s' },
        { nome: 'Flexão de Braço', series: '3', repeticoes: '15-20', descanso: '60s' }
      ],
      costas: [
        { nome: 'Puxada Frontal', series: '4', repeticoes: '8-12', descanso: '90s' },
        { nome: 'Remada Curvada', series: '3', repeticoes: '10-12', descanso: '90s' },
        { nome: 'Remada Unilateral', series: '3', repeticoes: '12-15', descanso: '60s' },
        { nome: 'Pullover', series: '3', repeticoes: '12-15', descanso: '60s' }
      ],
      pernas: [
        { nome: 'Agachamento', series: '4', repeticoes: '8-12', descanso: '2min' },
        { nome: 'Leg Press', series: '3', repeticoes: '12-15', descanso: '90s' },
        { nome: 'Extensora', series: '3', repeticoes: '15-20', descanso: '60s' },
        { nome: 'Flexora', series: '3', repeticoes: '15-20', descanso: '60s' },
        { nome: 'Panturrilha', series: '4', repeticoes: '20-25', descanso: '45s' }
      ],
      ombros: [
        { nome: 'Desenvolvimento', series: '4', repeticoes: '8-12', descanso: '90s' },
        { nome: 'Elevação Lateral', series: '3', repeticoes: '12-15', descanso: '60s' },
        { nome: 'Elevação Posterior', series: '3', repeticoes: '12-15', descanso: '60s' },
        { nome: 'Encolhimento', series: '3', repeticoes: '15-20', descanso: '60s' }
      ],
      bracos: [
        { nome: 'Rosca Direta', series: '3', repeticoes: '10-12', descanso: '60s' },
        { nome: 'Rosca Martelo', series: '3', repeticoes: '12-15', descanso: '60s' },
        { nome: 'Tríceps Testa', series: '3', repeticoes: '10-12', descanso: '60s' },
        { nome: 'Tríceps Pulley', series: '3', repeticoes: '12-15', descanso: '60s' }
      ]
    }

    const planos = {
      3: [
        { dia: 'Segunda-feira', grupoMuscular: 'Peito + Tríceps', exercicios: [...exerciciosPorGrupo.peito.slice(0, 3), ...exerciciosPorGrupo.bracos.slice(2)] },
        { dia: 'Quarta-feira', grupoMuscular: 'Costas + Bíceps', exercicios: [...exerciciosPorGrupo.costas.slice(0, 3), ...exerciciosPorGrupo.bracos.slice(0, 2)] },
        { dia: 'Sexta-feira', grupoMuscular: 'Pernas + Ombros', exercicios: [...exerciciosPorGrupo.pernas, ...exerciciosPorGrupo.ombros.slice(0, 2)] }
      ],
      4: [
        { dia: 'Segunda-feira', grupoMuscular: 'Peito + Tríceps', exercicios: [...exerciciosPorGrupo.peito, ...exerciciosPorGrupo.bracos.slice(2)] },
        { dia: 'Terça-feira', grupoMuscular: 'Costas + Bíceps', exercicios: [...exerciciosPorGrupo.costas, ...exerciciosPorGrupo.bracos.slice(0, 2)] },
        { dia: 'Quinta-feira', grupoMuscular: 'Pernas', exercicios: exerciciosPorGrupo.pernas },
        { dia: 'Sexta-feira', grupoMuscular: 'Ombros', exercicios: exerciciosPorGrupo.ombros }
      ],
      5: [
        { dia: 'Segunda-feira', grupoMuscular: 'Peito', exercicios: exerciciosPorGrupo.peito },
        { dia: 'Terça-feira', grupoMuscular: 'Costas', exercicios: exerciciosPorGrupo.costas },
        { dia: 'Quarta-feira', grupoMuscular: 'Pernas', exercicios: exerciciosPorGrupo.pernas },
        { dia: 'Quinta-feira', grupoMuscular: 'Ombros', exercicios: exerciciosPorGrupo.ombros },
        { dia: 'Sexta-feira', grupoMuscular: 'Braços', exercicios: exerciciosPorGrupo.bracos }
      ],
      6: [
        { dia: 'Segunda-feira', grupoMuscular: 'Peito', exercicios: exerciciosPorGrupo.peito },
        { dia: 'Terça-feira', grupoMuscular: 'Costas', exercicios: exerciciosPorGrupo.costas },
        { dia: 'Quarta-feira', grupoMuscular: 'Pernas', exercicios: exerciciosPorGrupo.pernas },
        { dia: 'Quinta-feira', grupoMuscular: 'Ombros', exercicios: exerciciosPorGrupo.ombros },
        { dia: 'Sexta-feira', grupoMuscular: 'Braços', exercicios: exerciciosPorGrupo.bracos },
        { dia: 'Sábado', grupoMuscular: 'Cardio + Core', exercicios: [
          { nome: 'Esteira', series: '1', repeticoes: '30min', descanso: '-' },
          { nome: 'Prancha', series: '3', repeticoes: '60s', descanso: '30s' },
          { nome: 'Abdominal', series: '3', repeticoes: '20', descanso: '30s' }
        ]}
      ]
    }

    return planos[userData.diasTreino as keyof typeof planos] || planos[3]
  }

  const gerarPlanoDieta = () => {
    const tmb = calcularTMB()
    const fatorAtividade = userData.diasTreino >= 5 ? 1.7 : userData.diasTreino >= 3 ? 1.5 : 1.3
    let calorias = tmb * fatorAtividade

    // Ajustar calorias baseado no objetivo
    if (userData.tipoTreino === 'emagrecimento') {
      calorias *= 0.8 // Déficit calórico
    } else if (userData.tipoTreino === 'hipertrofia') {
      calorias *= 1.1 // Superávit calórico
    }

    const proteinas = userData.peso * 2.2 // 2.2g por kg
    const gorduras = calorias * 0.25 / 9 // 25% das calorias
    const carboidratos = (calorias - (proteinas * 4) - (gorduras * 9)) / 4

    const refeicoes = [
      {
        nome: 'Café da Manhã',
        horario: '07:00',
        alimentos: ['2 ovos mexidos', '2 fatias de pão integral', '1 banana', '200ml leite desnatado'],
        calorias: 420
      },
      {
        nome: 'Lanche da Manhã',
        horario: '10:00',
        alimentos: ['1 iogurte grego', '30g granola', '1 maçã'],
        calorias: 280
      },
      {
        nome: 'Almoço',
        horario: '12:30',
        alimentos: ['150g peito de frango', '100g arroz integral', '100g feijão', 'Salada verde', '1 colher azeite'],
        calorias: 650
      },
      {
        nome: 'Lanche da Tarde',
        horario: '15:30',
        alimentos: ['1 shake de whey protein', '1 banana', '30g aveia'],
        calorias: 320
      },
      {
        nome: 'Jantar',
        horario: '19:00',
        alimentos: ['150g salmão grelhado', '150g batata doce', 'Brócolis refogado', 'Salada mista'],
        calorias: 480
      },
      {
        nome: 'Ceia',
        horario: '22:00',
        alimentos: ['200g iogurte natural', '30g castanhas', '1 colher mel'],
        calorias: 350
      }
    ]

    return {
      calorias: Math.round(calorias),
      proteinas: Math.round(proteinas),
      carboidratos: Math.round(carboidratos),
      gorduras: Math.round(gorduras),
      refeicoes
    }
  }

  const handleSubmit = () => {
    const treino = gerarPlanoTreino()
    const dieta = gerarPlanoDieta()
    setPlanoTreino(treino)
    setPlanoDieta(dieta)
    setStep(3)
  }

  const selecionarDieta = (nomeDieta: string) => {
    const dieta = dietasEspecificas.find(d => d.nome === nomeDieta)
    if (dieta) {
      setDietaSelecionada(nomeDieta)
      setPlanoDieta({
        calorias: dieta.calorias,
        proteinas: Math.round(dieta.calorias * 0.25 / 4), // 25% das calorias em proteína
        carboidratos: Math.round(dieta.calorias * 0.40 / 4), // 40% das calorias em carboidratos
        gorduras: Math.round(dieta.calorias * 0.35 / 9), // 35% das calorias em gorduras
        refeicoes: dieta.refeicoes
      })
    }
  }

  const getIMCStatus = (imc: number) => {
    if (imc < 18.5) return { status: 'Abaixo do peso', color: 'bg-blue-500' }
    if (imc < 25) return { status: 'Peso normal', color: 'bg-green-500' }
    if (imc < 30) return { status: 'Sobrepeso', color: 'bg-yellow-500' }
    return { status: 'Obesidade', color: 'bg-red-500' }
  }

  const imprimirPlanoCompleto = () => {
    const conteudo = `
      <html>
        <head>
          <title>Plano Completo - ${userData.nome}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2563eb; text-align: center; }
            h2 { color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-top: 30px; }
            .macros { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0; }
            .macro { text-align: center; padding: 15px; background: #f3f4f6; border-radius: 8px; }
            .exercicio { margin: 10px 0; padding: 10px; background: #f9fafb; border-radius: 5px; }
            .refeicao { margin: 15px 0; padding: 15px; background: #f9fafb; border-radius: 5px; }
            .info { display: flex; justify-content: space-between; font-size: 14px; color: #6b7280; }
            .horario { color: #6b7280; font-size: 14px; }
            .calorias { color: #dc2626; font-weight: bold; }
            ul { margin: 10px 0; }
            li { margin: 5px 0; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <h1>Plano Completo Personalizado</h1>
          <p><strong>Nome:</strong> ${userData.nome}</p>
          <p><strong>Objetivo:</strong> ${userData.tipoTreino}</p>
          <p><strong>Dias por semana:</strong> ${userData.diasTreino}</p>
          <p><strong>Nível:</strong> ${userData.nivel}</p>
          <p><strong>IMC:</strong> ${calcularIMC().toFixed(1)}</p>
          
          <h2>PLANO DE TREINO</h2>
          ${planoTreino.map(dia => `
            <h3>${dia.dia} - ${dia.grupoMuscular}</h3>
            ${dia.exercicios.map(ex => `
              <div class="exercicio">
                <strong>${ex.nome}</strong>
                <div class="info">
                  <span>${ex.series} séries</span>
                  <span>${ex.repeticoes} repetições</span>
                  <span>${ex.descanso} descanso</span>
                </div>
              </div>
            `).join('')}
          `).join('')}
          
          <h2>PLANO DE DIETA</h2>
          <div class="macros">
            <div class="macro">
              <strong>${planoDieta?.calorias}</strong><br>
              <small>Calorias</small>
            </div>
            <div class="macro">
              <strong>${planoDieta?.proteinas}g</strong><br>
              <small>Proteínas</small>
            </div>
            <div class="macro">
              <strong>${planoDieta?.carboidratos}g</strong><br>
              <small>Carboidratos</small>
            </div>
            <div class="macro">
              <strong>${planoDieta?.gorduras}g</strong><br>
              <small>Gorduras</small>
            </div>
          </div>
          
          <h3>Refeições</h3>
          ${planoDieta?.refeicoes.map(refeicao => `
            <div class="refeicao">
              <h4>${refeicao.nome} <span class="horario">(${refeicao.horario})</span> <span class="calorias">${refeicao.calorias} kcal</span></h4>
              <ul>
                ${refeicao.alimentos.map(alimento => `<li>${alimento}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </body>
      </html>
    `
    
    const janela = window.open('', '_blank')
    if (janela) {
      janela.document.write(conteudo)
      janela.document.close()
      janela.print()
    }
  }

  const enviarPorEmail = () => {
    const assunto = emailData.assunto || `Plano Fitness Personalizado - ${userData.nome}`
    const corpo = `
${emailData.mensagem}

=== PLANO DE TREINO ===
Nome: ${userData.nome}
Objetivo: ${userData.tipoTreino}
Dias por semana: ${userData.diasTreino}

${planoTreino.map(dia => `
${dia.dia} - ${dia.grupoMuscular}
${dia.exercicios.map(ex => `• ${ex.nome}: ${ex.series} séries x ${ex.repeticoes} reps (${ex.descanso} descanso)`).join('\n')}
`).join('\n')}

=== PLANO DE DIETA ===
${dietaSelecionada ? `Dieta Escolhida: ${dietaSelecionada}` : 'Dieta Personalizada'}
Calorias diárias: ${planoDieta?.calorias}
Proteínas: ${planoDieta?.proteinas}g
Carboidratos: ${planoDieta?.carboidratos}g
Gorduras: ${planoDieta?.gorduras}g

${planoDieta?.refeicoes.map(refeicao => `
${refeicao.nome} (${refeicao.horario}) - ${refeicao.calorias} kcal:
${refeicao.alimentos.map(alimento => `• ${alimento}`).join('\n')}
`).join('\n')}

Gerado pelo FitPlan Pro
    `.trim()

    const mailtoLink = `mailto:${emailData.destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`
    window.location.href = mailtoLink
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">FitPlan Pro</h1>
            <p className="text-lg text-gray-600">Seu plano personalizado de treino e dieta</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Dados Pessoais
              </CardTitle>
              <CardDescription>
                Preencha seus dados para gerar um plano 100% personalizado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={userData.nome}
                    onChange={(e) => setUserData({...userData, nome: e.target.value})}
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <Label htmlFor="idade">Idade</Label>
                  <Input
                    id="idade"
                    type="number"
                    value={userData.idade || ''}
                    onChange={(e) => setUserData({...userData, idade: Number(e.target.value)})}
                    placeholder="Sua idade"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    id="peso"
                    type="number"
                    value={userData.peso || ''}
                    onChange={(e) => setUserData({...userData, peso: Number(e.target.value)})}
                    placeholder="70"
                  />
                </div>
                <div>
                  <Label htmlFor="altura">Altura (cm)</Label>
                  <Input
                    id="altura"
                    type="number"
                    value={userData.altura || ''}
                    onChange={(e) => setUserData({...userData, altura: Number(e.target.value)})}
                    placeholder="175"
                  />
                </div>
                <div>
                  <Label htmlFor="sexo">Sexo</Label>
                  <Select value={userData.sexo} onValueChange={(value: 'masculino' | 'feminino') => setUserData({...userData, sexo: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={() => setStep(2)} 
                className="w-full"
                disabled={!userData.nome || !userData.idade || !userData.peso || !userData.altura}
              >
                Continuar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Configurações do Treino</h1>
            <p className="text-lg text-gray-600">Personalize seu plano de acordo com seus objetivos</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Preferências de Treino
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Quantos dias por semana você quer treinar?</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {[3, 4, 5, 6].map((dias) => (
                    <Button
                      key={dias}
                      variant={userData.diasTreino === dias ? "default" : "outline"}
                      onClick={() => setUserData({...userData, diasTreino: dias})}
                      className="h-16 flex flex-col"
                    >
                      <Calendar className="w-5 h-5 mb-1" />
                      {dias} dias
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Qual seu objetivo principal?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {[
                    { value: 'hipertrofia', label: 'Ganhar Massa', icon: Dumbbell },
                    { value: 'emagrecimento', label: 'Emagrecer', icon: TrendingUp },
                    { value: 'resistencia', label: 'Resistência', icon: Target },
                    { value: 'forca', label: 'Força', icon: Dumbbell }
                  ].map((objetivo) => (
                    <Button
                      key={objetivo.value}
                      variant={userData.tipoTreino === objetivo.value ? "default" : "outline"}
                      onClick={() => setUserData({...userData, tipoTreino: objetivo.value as any})}
                      className="h-16 flex items-center gap-2"
                    >
                      <objetivo.icon className="w-5 h-5" />
                      {objetivo.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Qual seu nível de experiência?</Label>
                <Select value={userData.nivel} onValueChange={(value: 'iniciante' | 'intermediario' | 'avancado') => setUserData({...userData, nivel: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iniciante">Iniciante (0-6 meses)</SelectItem>
                    <SelectItem value="intermediario">Intermediário (6 meses - 2 anos)</SelectItem>
                    <SelectItem value="avancado">Avançado (2+ anos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Voltar
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Gerar Plano Personalizado
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const imc = calcularIMC()
  const imcStatus = getIMCStatus(imc)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Seu Plano Personalizado</h1>
          <p className="text-lg text-gray-600">Olá {userData.nome}! Aqui está seu plano completo</p>
        </div>

        {/* Resumo Pessoal */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resumo Pessoal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{imc.toFixed(1)}</div>
                <div className="text-sm text-gray-600">IMC</div>
                <Badge className={`${imcStatus.color} text-white mt-1`}>
                  {imcStatus.status}
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userData.diasTreino}</div>
                <div className="text-sm text-gray-600">Dias/Semana</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{planoDieta?.calorias}</div>
                <div className="text-sm text-gray-600">Calorias/Dia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{userData.tipoTreino}</div>
                <div className="text-sm text-gray-600">Objetivo</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="treino" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="treino" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              Plano de Treino
            </TabsTrigger>
            <TabsTrigger value="dieta" className="flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              Plano de Dieta
            </TabsTrigger>
            <TabsTrigger value="opcoes" className="flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              Opções de Dietas
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Enviar por Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="treino" className="space-y-4">
            {planoTreino.map((dia, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{dia.dia}</span>
                    <Badge variant="secondary">{dia.grupoMuscular}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dia.exercicios.map((exercicio, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium">{exercicio.nome}</div>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>{exercicio.series} séries</span>
                          <span>{exercicio.repeticoes} reps</span>
                          <span>{exercicio.descanso} descanso</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="dieta" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Macronutrientes Diários</CardTitle>
                {dietaSelecionada && (
                  <CardDescription>
                    Baseado na dieta: <strong>{dietaSelecionada}</strong>
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{planoDieta?.calorias}</div>
                    <div className="text-sm text-gray-600">Calorias</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{planoDieta?.proteinas}g</div>
                    <div className="text-sm text-gray-600">Proteínas</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{planoDieta?.carboidratos}g</div>
                    <div className="text-sm text-gray-600">Carboidratos</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{planoDieta?.gorduras}g</div>
                    <div className="text-sm text-gray-600">Gorduras</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {planoDieta?.refeicoes.map((refeicao, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{refeicao.nome}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">{refeicao.horario}</Badge>
                        <Badge className="bg-red-500 text-white">{refeicao.calorias} kcal</Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {refeicao.alimentos.map((alimento, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {alimento}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="opcoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5" />
                  Escolha sua Dieta Ideal
                </CardTitle>
                <CardDescription>
                  Selecione uma dieta específica para receber refeições personalizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dietasEspecificas.map((dieta, index) => (
                    <Card 
                      key={index} 
                      className={`border-2 hover:border-blue-300 transition-colors cursor-pointer ${
                        dietaSelecionada === dieta.nome ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => selecionarDieta(dieta.nome)}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-lg">{dieta.nome}</span>
                          <Badge className="bg-green-500 text-white">{dieta.calorias} kcal/dia</Badge>
                        </CardTitle>
                        <CardDescription>{dieta.descricao}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-sm text-green-600 mb-2">Benefícios:</h4>
                            <ul className="text-sm space-y-1">
                              {dieta.beneficios.map((beneficio, idx) => (
                                <li key={idx} className="text-gray-600">• {beneficio}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-orange-600 mb-1">Restrições:</h4>
                            <p className="text-sm text-gray-600">{dieta.restricoes}</p>
                          </div>
                          {dietaSelecionada === dieta.nome && (
                            <Badge className="bg-blue-500 text-white w-full justify-center">
                              ✓ Dieta Selecionada
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {dietaSelecionada && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">
                      ✅ Dieta "{dietaSelecionada}" selecionada! 
                      Vá para a aba "Plano de Dieta" para ver suas refeições específicas.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Enviar Plano por Email
                </CardTitle>
                <CardDescription>
                  Compartilhe seu plano personalizado de treino e dieta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="destinatario">Email do destinatário</Label>
                  <Input
                    id="destinatario"
                    type="email"
                    value={emailData.destinatario}
                    onChange={(e) => setEmailData({...emailData, destinatario: e.target.value})}
                    placeholder="exemplo@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="assunto">Assunto (opcional)</Label>
                  <Input
                    id="assunto"
                    value={emailData.assunto}
                    onChange={(e) => setEmailData({...emailData, assunto: e.target.value})}
                    placeholder={`Plano Fitness Personalizado - ${userData.nome}`}
                  />
                </div>
                
                <div>
                  <Label htmlFor="mensagem">Mensagem personalizada (opcional)</Label>
                  <Textarea
                    id="mensagem"
                    value={emailData.mensagem}
                    onChange={(e) => setEmailData({...emailData, mensagem: e.target.value})}
                    placeholder="Olá! Compartilho com você meu plano personalizado de treino e dieta..."
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={enviarPorEmail}
                  disabled={!emailData.destinatario}
                  className="w-full flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar por Email
                </Button>
                
                <p className="text-sm text-gray-600 text-center">
                  Será aberto seu cliente de email padrão com o plano completo
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={imprimirPlanoCompleto} variant="outline" className="flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Imprimir Plano Completo
          </Button>
          <Button onClick={() => setStep(1)} variant="outline">
            Criar Novo Plano
          </Button>
        </div>
      </div>
    </div>
  )
}