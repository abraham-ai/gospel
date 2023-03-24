import Character from './Character';

import chatsubo from './chatsubo';
import czar from './czar';
import delic from './delic';
import gene from './gene';
import jmill from './jmill';
import lucy from './lucy';
import marzipan from './marzipan';
import opalyst from './opalyst';
import seamus from './seamus';
import vanessa from './vanessa';
import vincent from './vincent';
import xander from './xander';
  
interface Characters {
  [key: string]: Character;
}

const characters : Characters = {
	chatsubo,
	czar,
	delic,
	gene,
	jmill,
	lucy,
	marzipan,
	opalyst,
	seamus,
	vanessa,
	vincent,
	xander
};

export default characters;