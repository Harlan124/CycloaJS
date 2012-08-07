"use strict";

/**
 * アセンブラに関する定数などのための名前空間
 * @type {Object}
 * @namespace
 */
cycloa.asm = {};
/**
 * オペコード一覧
 * @const
 * @type {Object}
 * @enum {Number}
 */
cycloa.asm.opcode = {
	'LDA':0,
	'LDX':1,
	'LDY':2,
	'STA':3,
	'STX':4,
	'STY':5,
	'TAX':6,
	'TAY':7,
	'TSX':8,
	'TXA':9,
	'TXS':10,
	'TYA':11,
	'ADC':12,
	'AND':13,
	'ASL':14,
	'BIT':15,
	'CMP':16,
	'CPX':17,
	'CPY':18,
	'DEC':19,
	'DEX':20,
	'DEY':21,
	'EOR':22,
	'INC':23,
	'INX':24,
	'INY':25,
	'LSR':26,
	'ORA':27,
	'ROL':28,
	'ROR':29,
	'SBC':30,
	'PHA':31,
	'PHP':32,
	'PLA':33,
	'PLP':34,
	'CLC':35,
	'CLD':36,
	'CLI':37,
	'CLV':38,
	'SEC':39,
	'SED':40,
	'SEI':41,
	'BRK':42,
	'NOP':43,
	'RTS':44,
	'RTI':45,
	'JMP':46,
	'JSR':47,
	'BCC':48,
	'BCS':49,
	'BEQ':50,
	'BMI':51,
	'BNE':52,
	'BPL':53,
	'BVC':54,
	'BVS':55};
/**
 * アドレッシングモード一覧
 * @type {Object}
 * @const
 * @enum {Number}
 */
cycloa.asm.addr_mode = {
	'None': 0,
	'Immediate': 1,
	'Zeropage': 2,
	'ZeropageX': 3,
	'ZeropageY': 4,
	'Absolute': 5,
	'AbsoluteX': 6,
	'AbsoluteY': 7,
	'Indirect': 8,
	'IndirectX': 9,
	'IndirectY': 10,
	'Relative': 11
};
/**
 * アドレッシングモードごとのオペランドの一覧
 * @type {Object}
 * @const
 */
cycloa.asm.operand_size = {
	'None': 0,
	'Immediate': 1,
	'ZeroPage': 1,
	'ZeroPageX': 1,
	'ZeroPageY': 1,
	'Absolute': 2,
	'AbsoluteX': 2,
	'AbsoluteY': 2,
	'Indirect': 1,
	'IndirectX': 1,
	'IndirectY': 1,
	'Relative': 1
};
/**
 * 命令デコードテーブル
 * @type {Object[]}
 * @const
 */
cycloa.asm.decode_table = [
	{'opcode':cycloa.asm.opcode.BRK,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.ORA,'addr_mode':cycloa.asm.addr_mode.IndirectX,'operand_size':cycloa.asm.operand_size.IndirectX},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.ORA,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.ASL,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	null,
	{'opcode':cycloa.asm.opcode.PHP,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.ORA,'addr_mode':cycloa.asm.addr_mode.Immediate,'operand_size':cycloa.asm.operand_size.Immediate},
	{'opcode':cycloa.asm.opcode.ASL,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	null,
	null,
	{'opcode':cycloa.asm.opcode.ORA,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.ASL,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	null,
	{'opcode':cycloa.asm.opcode.BPL,'addr_mode':cycloa.asm.addr_mode.Relative,'operand_size':cycloa.asm.operand_size.Relative},
	{'opcode':cycloa.asm.opcode.ORA,'addr_mode':cycloa.asm.addr_mode.IndirectY,'operand_size':cycloa.asm.operand_size.IndirectY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.ORA,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	{'opcode':cycloa.asm.opcode.ASL,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	null,
	{'opcode':cycloa.asm.opcode.CLC,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.ORA,'addr_mode':cycloa.asm.addr_mode.AbsoluteY,'operand_size':cycloa.asm.operand_size.AbsoluteY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.ORA,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	{'opcode':cycloa.asm.opcode.ASL,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	null,
	{'opcode':cycloa.asm.opcode.JSR,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.AND,'addr_mode':cycloa.asm.addr_mode.IndirectX,'operand_size':cycloa.asm.operand_size.IndirectX},
	null,
	null,
	{'opcode':cycloa.asm.opcode.BIT,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.AND,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.ROL,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	null,
	{'opcode':cycloa.asm.opcode.PLP,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.AND,'addr_mode':cycloa.asm.addr_mode.Immediate,'operand_size':cycloa.asm.operand_size.Immediate},
	{'opcode':cycloa.asm.opcode.ROL,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	null,
	{'opcode':cycloa.asm.opcode.BIT,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.AND,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.ROL,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	null,
	{'opcode':cycloa.asm.opcode.BMI,'addr_mode':cycloa.asm.addr_mode.Relative,'operand_size':cycloa.asm.operand_size.Relative},
	{'opcode':cycloa.asm.opcode.AND,'addr_mode':cycloa.asm.addr_mode.IndirectY,'operand_size':cycloa.asm.operand_size.IndirectY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.AND,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	{'opcode':cycloa.asm.opcode.ROL,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	null,
	{'opcode':cycloa.asm.opcode.SEC,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.AND,'addr_mode':cycloa.asm.addr_mode.AbsoluteY,'operand_size':cycloa.asm.operand_size.AbsoluteY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.AND,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	{'opcode':cycloa.asm.opcode.ROL,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	null,
	{'opcode':cycloa.asm.opcode.RTI,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.EOR,'addr_mode':cycloa.asm.addr_mode.IndirectX,'operand_size':cycloa.asm.operand_size.IndirectX},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.EOR,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.LSR,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	null,
	{'opcode':cycloa.asm.opcode.PHA,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.EOR,'addr_mode':cycloa.asm.addr_mode.Immediate,'operand_size':cycloa.asm.operand_size.Immediate},
	{'opcode':cycloa.asm.opcode.LSR,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	null,
	{'opcode':cycloa.asm.opcode.JMP,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.EOR,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.LSR,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	null,
	{'opcode':cycloa.asm.opcode.BVC,'addr_mode':cycloa.asm.addr_mode.Relative,'operand_size':cycloa.asm.operand_size.Relative},
	{'opcode':cycloa.asm.opcode.EOR,'addr_mode':cycloa.asm.addr_mode.IndirectY,'operand_size':cycloa.asm.operand_size.IndirectY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.EOR,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	{'opcode':cycloa.asm.opcode.LSR,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	null,
	{'opcode':cycloa.asm.opcode.CLI,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.EOR,'addr_mode':cycloa.asm.addr_mode.AbsoluteY,'operand_size':cycloa.asm.operand_size.AbsoluteY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.EOR,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	{'opcode':cycloa.asm.opcode.LSR,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	null,
	{'opcode':cycloa.asm.opcode.RTS,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.ADC,'addr_mode':cycloa.asm.addr_mode.IndirectX,'operand_size':cycloa.asm.operand_size.IndirectX},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.ADC,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.ROR,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	null,
	{'opcode':cycloa.asm.opcode.PLA,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.ADC,'addr_mode':cycloa.asm.addr_mode.Immediate,'operand_size':cycloa.asm.operand_size.Immediate},
	{'opcode':cycloa.asm.opcode.ROR,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	null,
	{'opcode':cycloa.asm.opcode.JMP,'addr_mode':cycloa.asm.addr_mode.Indirect,'operand_size':cycloa.asm.operand_size.Indirect},
	{'opcode':cycloa.asm.opcode.ADC,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.ROR,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	null,
	{'opcode':cycloa.asm.opcode.BVS,'addr_mode':cycloa.asm.addr_mode.Relative,'operand_size':cycloa.asm.operand_size.Relative},
	{'opcode':cycloa.asm.opcode.ADC,'addr_mode':cycloa.asm.addr_mode.IndirectY,'operand_size':cycloa.asm.operand_size.IndirectY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.ADC,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	{'opcode':cycloa.asm.opcode.ROR,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	null,
	{'opcode':cycloa.asm.opcode.SEI,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.ADC,'addr_mode':cycloa.asm.addr_mode.AbsoluteY,'operand_size':cycloa.asm.operand_size.AbsoluteY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.ADC,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	{'opcode':cycloa.asm.opcode.ROR,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	null,
	null,
	{'opcode':cycloa.asm.opcode.STA,'addr_mode':cycloa.asm.addr_mode.IndirectX,'operand_size':cycloa.asm.operand_size.IndirectX},
	null,
	null,
	{'opcode':cycloa.asm.opcode.STY,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.STA,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.STX,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	null,
	{'opcode':cycloa.asm.opcode.DEY,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	null,
	{'opcode':cycloa.asm.opcode.TXA,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	null,
	{'opcode':cycloa.asm.opcode.STY,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.STA,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.STX,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	null,
	{'opcode':cycloa.asm.opcode.BCC,'addr_mode':cycloa.asm.addr_mode.Relative,'operand_size':cycloa.asm.operand_size.Relative},
	{'opcode':cycloa.asm.opcode.STA,'addr_mode':cycloa.asm.addr_mode.IndirectY,'operand_size':cycloa.asm.operand_size.IndirectY},
	null,
	null,
	{'opcode':cycloa.asm.opcode.STY,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	{'opcode':cycloa.asm.opcode.STA,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	{'opcode':cycloa.asm.opcode.STX,'addr_mode':cycloa.asm.addr_mode.ZeropageY,'operand_size':cycloa.asm.operand_size.ZeropageY},
	null,
	{'opcode':cycloa.asm.opcode.TYA,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.STA,'addr_mode':cycloa.asm.addr_mode.AbsoluteY,'operand_size':cycloa.asm.operand_size.AbsoluteY},
	{'opcode':cycloa.asm.opcode.TXS,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	null,
	null,
	{'opcode':cycloa.asm.opcode.STA,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	null,
	null,
	{'opcode':cycloa.asm.opcode.LDY,'addr_mode':cycloa.asm.addr_mode.Immediate,'operand_size':cycloa.asm.operand_size.Immediate},
	{'opcode':cycloa.asm.opcode.LDA,'addr_mode':cycloa.asm.addr_mode.IndirectX,'operand_size':cycloa.asm.operand_size.IndirectX},
	{'opcode':cycloa.asm.opcode.LDX,'addr_mode':cycloa.asm.addr_mode.Immediate,'operand_size':cycloa.asm.operand_size.Immediate},
	null,
	{'opcode':cycloa.asm.opcode.LDY,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.LDA,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.LDX,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	null,
	{'opcode':cycloa.asm.opcode.TAY,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.LDA,'addr_mode':cycloa.asm.addr_mode.Immediate,'operand_size':cycloa.asm.operand_size.Immediate},
	{'opcode':cycloa.asm.opcode.TAX,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	null,
	{'opcode':cycloa.asm.opcode.LDY,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.LDA,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.LDX,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	null,
	{'opcode':cycloa.asm.opcode.BCS,'addr_mode':cycloa.asm.addr_mode.Relative,'operand_size':cycloa.asm.operand_size.Relative},
	{'opcode':cycloa.asm.opcode.LDA,'addr_mode':cycloa.asm.addr_mode.IndirectY,'operand_size':cycloa.asm.operand_size.IndirectY},
	null,
	null,
	{'opcode':cycloa.asm.opcode.LDY,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	{'opcode':cycloa.asm.opcode.LDA,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	{'opcode':cycloa.asm.opcode.LDX,'addr_mode':cycloa.asm.addr_mode.ZeropageY,'operand_size':cycloa.asm.operand_size.ZeropageY},
	null,
	{'opcode':cycloa.asm.opcode.CLV,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.LDA,'addr_mode':cycloa.asm.addr_mode.AbsoluteY,'operand_size':cycloa.asm.operand_size.AbsoluteY},
	{'opcode':cycloa.asm.opcode.TSX,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	null,
	{'opcode':cycloa.asm.opcode.LDY,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	{'opcode':cycloa.asm.opcode.LDA,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	{'opcode':cycloa.asm.opcode.LDX,'addr_mode':cycloa.asm.addr_mode.AbsoluteY,'operand_size':cycloa.asm.operand_size.AbsoluteY},
	null,
	{'opcode':cycloa.asm.opcode.CPY,'addr_mode':cycloa.asm.addr_mode.Immediate,'operand_size':cycloa.asm.operand_size.Immediate},
	{'opcode':cycloa.asm.opcode.CMP,'addr_mode':cycloa.asm.addr_mode.IndirectX,'operand_size':cycloa.asm.operand_size.IndirectX},
	null,
	null,
	{'opcode':cycloa.asm.opcode.CPY,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.CMP,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.DEC,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	null,
	{'opcode':cycloa.asm.opcode.INY,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.CMP,'addr_mode':cycloa.asm.addr_mode.Immediate,'operand_size':cycloa.asm.operand_size.Immediate},
	{'opcode':cycloa.asm.opcode.DEX,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	null,
	{'opcode':cycloa.asm.opcode.CPY,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.CMP,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.DEC,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	null,
	{'opcode':cycloa.asm.opcode.BNE,'addr_mode':cycloa.asm.addr_mode.Relative,'operand_size':cycloa.asm.operand_size.Relative},
	{'opcode':cycloa.asm.opcode.CMP,'addr_mode':cycloa.asm.addr_mode.IndirectY,'operand_size':cycloa.asm.operand_size.IndirectY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.CMP,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	{'opcode':cycloa.asm.opcode.DEC,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	null,
	{'opcode':cycloa.asm.opcode.CLD,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.CMP,'addr_mode':cycloa.asm.addr_mode.AbsoluteY,'operand_size':cycloa.asm.operand_size.AbsoluteY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.CMP,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	{'opcode':cycloa.asm.opcode.DEC,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	null,
	{'opcode':cycloa.asm.opcode.CPX,'addr_mode':cycloa.asm.addr_mode.Immediate,'operand_size':cycloa.asm.operand_size.Immediate},
	{'opcode':cycloa.asm.opcode.SBC,'addr_mode':cycloa.asm.addr_mode.IndirectX,'operand_size':cycloa.asm.operand_size.IndirectX},
	null,
	null,
	{'opcode':cycloa.asm.opcode.CPX,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.SBC,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	{'opcode':cycloa.asm.opcode.INC,'addr_mode':cycloa.asm.addr_mode.Zeropage,'operand_size':cycloa.asm.operand_size.Zeropage},
	null,
	{'opcode':cycloa.asm.opcode.INX,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.SBC,'addr_mode':cycloa.asm.addr_mode.Immediate,'operand_size':cycloa.asm.operand_size.Immediate},
	{'opcode':cycloa.asm.opcode.NOP,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	null,
	{'opcode':cycloa.asm.opcode.CPX,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.SBC,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	{'opcode':cycloa.asm.opcode.INC,'addr_mode':cycloa.asm.addr_mode.Absolute,'operand_size':cycloa.asm.operand_size.Absolute},
	null,
	{'opcode':cycloa.asm.opcode.BEQ,'addr_mode':cycloa.asm.addr_mode.Relative,'operand_size':cycloa.asm.operand_size.Relative},
	{'opcode':cycloa.asm.opcode.SBC,'addr_mode':cycloa.asm.addr_mode.IndirectY,'operand_size':cycloa.asm.operand_size.IndirectY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.SBC,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	{'opcode':cycloa.asm.opcode.INC,'addr_mode':cycloa.asm.addr_mode.ZeropageX,'operand_size':cycloa.asm.operand_size.ZeropageX},
	null,
	{'opcode':cycloa.asm.opcode.SED,'addr_mode':cycloa.asm.addr_mode.None,'operand_size':cycloa.asm.operand_size.None},
	{'opcode':cycloa.asm.opcode.SBC,'addr_mode':cycloa.asm.addr_mode.AbsoluteY,'operand_size':cycloa.asm.operand_size.AbsoluteY},
	null,
	null,
	null,
	{'opcode':cycloa.asm.opcode.SBC,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	{'opcode':cycloa.asm.opcode.INC,'addr_mode':cycloa.asm.addr_mode.AbsoluteX,'operand_size':cycloa.asm.operand_size.AbsoluteX},
	null];
/**
 * @constructor
 */
cycloa.asm.Decoder = function (){

};
/**
 * 実際に命令をデコードし、登録されたハンドラを呼び出します
 * @param {Array} code
 * @param {Integer} base_addr
 */
cycloa.asm.Decoder.prototype.invoke = function(code, base_addr){
	for(var i=0;i<code.length;++i){
		var addr = base_addr+i;
		var info = cycloa.asm.decode_table[code[i]];
		if(info != null){
			var operand = null;
			if(info.operand_size == 1){
				operand = code[++i];
			}else if(info.operand_size == 2){
				operand = code[++i] | (code[++i] << 8);
			}
			this.handler(addr, info.opcode, info.addr_mode, operand);
		}else{
			this.handler(addr, null, null, null);
		}
	}
};
/**
 * ハンドラを登録します
 * @param {function} handler
 */
cycloa.asm.Decoder.prototype.registerHandler = function(handler){
	this.handler = handler;
};