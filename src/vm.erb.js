%# -*- encoding: utf-8 -*-
%require File.expand_path File.dirname(__FILE__)+"/gen.rb";

/**
 * @constructor
 */
cycloa.VirtualMachine = function(videoFairy, audioFairy, pad1Fairy, pad2Fairy) {
	this.tracer = new cycloa.Tracer(this);
	this.videoFairy = videoFairy;
	this.audioFairy = audioFairy;
	this.pad1Fairy = pad1Fairy || new cycloa.AbstractPadFairy();
	this.pad2Fairy = pad2Fairy || new cycloa.AbstractPadFairy();
	
	this.pad1Idx = 0;
	this.pad2Idx = 0;
<%= render File.expand_path File.dirname(__FILE__)+"/vm_cpu_init.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_video_init.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_init.erb.js" %>
<%= render (File.expand_path (File.dirname(__FILE__)+"/vm_audio_rectangle_init.erb.js")), :isFirstChannel=>false %>
<%= render (File.expand_path (File.dirname(__FILE__)+"/vm_audio_rectangle_init.erb.js")), :isFirstChannel=>false %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_triangle_init.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_noize_init.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_digital_init.erb.js" %>

	this.reservedClockDelta = 0;

	this.vramMirroring = new Array(4);
	this.internalVram = new Array(4);
	for(var i=0;i<4;++i){
		this.internalVram[i] = new Uint8Array(0x400);
	}

};

cycloa.VirtualMachine.Mapper = [
	/* mapper 0 */
	function(self){
		self.writeMapperCPU = function(/* uint8_t */ addr){
			/*do nothing!*/
		};
		var idx = 0;
		for(var i=0; i<32; ++i){
			self.rom[i] = self.prgRom.subarray(idx, idx+=<%= NES::PRG_ROM_BLOCK_SIZE %>);
			if(idx >= self.prgRom.length){
				idx = 0;
			}
		}
		var cidx = 0;
		for(var i=0;i<0x10; ++i){
			self.pattern[i] = self.chrRom.subarray(cidx, cidx += <%= NES::CHR_ROM_BLOCK_SIZE %>);
		}
	}
];

cycloa.VirtualMachine.ZNFlagCache = new Uint8Array([
	0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80,
	0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80,
	0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80,
	0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80,
	0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80,
	0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80,
	0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80,
	0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80
]);

cycloa.VirtualMachine.TransTable = new Uint32Array(<%= CPU::Middle::TransTable %>);

cycloa.VirtualMachine.LengthCounterConst = [
		0x0A,0xFE,0x14,0x02,0x28,0x04,0x50,0x06,
		0xA0,0x08,0x3C,0x0A,0x0E,0x0C,0x1A,0x0E,
		0x0C,0x10,0x18,0x12,0x30,0x14,0x60,0x16,
		0xC0,0x18,0x48,0x1A,0x10,0x1C,0x20,0x1E
];

cycloa.VirtualMachine.prototype.run = function () {
	<%= CPU::RunInit() %>
	<%= Video::RunInit() %>
	<%= Audio::RunInit() %>
	var _run = true;
	var reservedClockDelta = this.reservedClockDelta;
	while(_run) {
		//console.log(this.tracer.decode());
		<%= render File.expand_path File.dirname(__FILE__)+"/vm_cpu_run.erb.js" %>
		<%= render File.expand_path File.dirname(__FILE__)+"/vm_video_run.erb.js" %>
		<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_run.erb.js" %>
	}
	this.reservedClockDelta = reservedClockDelta;
	return _run;
};
/**
 * @function
 */
cycloa.VirtualMachine.prototype.onHardReset = function () {
	this.onHardResetCPU();
	this.onHardResetVideo();
	this.__audio__onHardReset();
	this.__rectangle0__onHardReset();
	this.__rectangle1__onHardReset();
	this.__triangle__onHardReset();
	this.__noize__onHardReset();
	this.__digital__onHardReset();
};
cycloa.VirtualMachine.prototype.onReset = function () {
	this.onResetCPU();
	this.onResetVideo();
	this.__audio__onReset();
	this.__rectangle0__onReset();
	this.__rectangle1__onReset();
	this.__triangle__onReset();
	this.__noize__onReset();
	this.__digital__onReset();
};
cycloa.VirtualMachine.prototype.onVBlank = function(){
};
cycloa.VirtualMachine.prototype.onIRQ = function(){
};
cycloa.VirtualMachine.prototype.read = function(addr) { 
	var __val__;
	var rom = this.rom; var ram = this.ram;
	<%= CPU::MemRead("addr", "__val__") %>;
	return __val__;
};

cycloa.VirtualMachine.prototype.load = function(rom){
	this.loadROM(rom);
	// マッパー関数のインジェクション
	cycloa.VirtualMachine.Mapper[this.mapperNo](this);
	this.changeMirrorType(this.mirrorType);
};

cycloa.VirtualMachine.prototype.loadROM = function(data){
	var data8 = new Uint8Array(data);
	/* check NES data8 */
	if(!(data8[0] === 0x4e && data8[1]===0x45 && data8[2]===0x53 && data8[3] == 0x1a)){
		throw new cycloa.err.CoreException("[FIXME] Invalid header!!");
	}
	this.prgSize = <%= NES::PRG_ROM_PAGE_SIZE %> * data8[4];
	this.chrSize = <%= NES::CHR_ROM_PAGE_SIZE %> * data8[5];
	this.prgPageCnt = data8[4];
	this.chrPageCnt = data8[5];
	this.mapperNo = ((data8[6] & 0xf0)>>4) | (data8[7] & 0xf0);
	this.trainerFlag = (data8[6] & 0x4) === 0x4;
	this.sramFlag = (data8[6] & 0x2) === 0x2;
	if((data8[6] & 0x8) == 0x8){
		this.mirrorType = <%= NES::FOUR_SCREEN %>;
	}else{
		this.mirrorType = (data8[6] & 0x1) == 0x1 ? <%= NES::VERTICAL %> : <%= NES::HORIZONTAL %>;
	}
	/**
	 * @type {number} uint32_t
	 */
	var fptr = 0x10;
	if(this.trainerFlag){
		if(fptr + <%= NES::TRAINER_SIZE %> > data.byteLength) throw new cycloa.err.CoreException("[FIXME] Invalid file size; too short!");
		this.trainer = new Uint8Array(data, fptr, <%= NES::TRAINER_SIZE %>);
		fptr += <%= NES::TRAINER_SIZE %>;
	}
	/* read PRG ROM */
	if(fptr + this.prgSize > data.byteLength) throw new cycloa.err.CoreException("[FIXME] Invalid file size; too short!");
	this.prgRom = new Uint8Array(data, fptr, this.prgSize);
	fptr += this.prgSize;

	if(fptr + this.chrSize > data.byteLength) throw new cycloa.err.CoreException("[FIXME] Invalid file size; too short!");
	else if(fptr + this.chrSize < data.byteLength) throw cycloa.err.CoreException("[FIXME] Invalid file size; too long!");

	this.chrRom = new Uint8Array(data, fptr, this.chrSize);
};


cycloa.VirtualMachine.prototype.changeMirrorType = function(/* NesFile::MirrorType */ mirrorType) {
	this.mirrorType = mirrorType;
	switch(mirrorType)
	{
	case <%= NES::SINGLE0 %>: {
		this.vramMirroring[0] = this.internalVram[0];
		this.vramMirroring[1] = this.internalVram[0];
		this.vramMirroring[2] = this.internalVram[0];
		this.vramMirroring[3] = this.internalVram[0];
		break;
	}
	case <%= NES::SINGLE1 %>: {
		this.vramMirroring[0] = this.internalVram[1];
		this.vramMirroring[1] = this.internalVram[1];
		this.vramMirroring[2] = this.internalVram[1];
		this.vramMirroring[3] = this.internalVram[1];
		break;
	}
	case <%= NES::FOUR_SCREEN %>: {
		this.vramMirroring[0] = this.internalVram[1];
		this.vramMirroring[1] = this.internalVram[2];
		this.vramMirroring[2] = this.internalVram[3];
		this.vramMirroring[3] = this.internalVram[4];
		break;
	}
	case <%= NES::HORIZONTAL %>: {
		this.vramMirroring[0] = this.internalVram[0];
		this.vramMirroring[1] = this.internalVram[0];
		this.vramMirroring[2] = this.internalVram[1];
		this.vramMirroring[3] = this.internalVram[1];
		break;
	}
	case <%= NES::VERTICAL%>: {
		this.vramMirroring[0] = this.internalVram[0];
		this.vramMirroring[1] = this.internalVram[1];
		this.vramMirroring[2] = this.internalVram[0];
		this.vramMirroring[3] = this.internalVram[1];
		break;
	}
	default: {
		throw new cycloa.err.CoreException("Invalid mirroring type!");
	}
	}
};

<%= render File.expand_path File.dirname(__FILE__)+"/vm_cpu_method.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_video_method.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_method.erb.js" %>
<%= render (File.expand_path (File.dirname(__FILE__)+"/vm_audio_rectangle_method.erb.js")), :isFirstChannel=>false %>
<%= render (File.expand_path (File.dirname(__FILE__)+"/vm_audio_rectangle_method.erb.js")), :isFirstChannel=>true %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_triangle_method.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_noize_method.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_digital_method.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_ioport_method.erb.js" %>

