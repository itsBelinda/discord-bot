require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const utils = require("discord.js-utils");

//prefix = '!'
const { prefix, second, color_pfx } = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', message => {
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	
	switch(cmd) {
	case 'ping':
		message.channel.send('Pong');
		var imghere
		utils.random.dog().then(console.log)//then(message.channel.send)
							.catch(console.error);
		break;
	case 'beep':
		message.channel.send('Boop');
		break;
	case 'server':		 
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
		break;
	case 'user': 
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
		break;
	case 'avatar':
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
		}
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
			});
		message.channel.send(avatarList);
		
		break;		
	case 'doggo':
		utils.random.dog().then(url => {
			const doggoEmbed = new Discord.MessageEmbed()
								.setTitle('Here\'s your doggo')
								.setImage(url);

								message.channel.send(doggoEmbed);})
		
		break;
	case 'color':
		
		if(args){
		let role_name = `${color_pfx}${args[0]}`
			message.channel.send(role_name);
			
			// check if already exists:
			let searchRole = message.member.guild.roles.cache.find(role => role.name === role_name);
			
			if( !searchRole )
			{
				// create role and add to user
				message.guild.roles.create({ data: { name: role_name,
												color: args[0]} })
												.then(role => message.member.roles.add(role))
												.catch(console.error);
				
				message.channel.send(`Congratulations, you got the color!`);
			}
			else{
				// if exists: check if member has it
				
				if(message.member.roles.cache.has(searchRole.id)) {
					message.member.roles.remove(searchRole).catch(console.error);
					message.channel.send(`You have that color, removing it!`);
					
				} else {
					message.member.roles.add(searchRole).catch(console.error);
					message.channel.send(`Congratulations, you got the color!`);
					
				}
			}
			
			
		}
		
		break;
	case 'insult':
		if (!message.mentions.users.size) {
			message.channel.send(`Du besch es arschloch ${message.author}!`);
		}
		else
		{
			const insluts = message.mentions.users.map(user => {
			return `Du besch en Vollidiot <@${user.id}>!`;
			});
			message.channel.send(insluts);
			
		}
		
		break;
	default:
		message.channel.send(`I don't understand ...  "${cmd}"`);
	}
})

client.login(process.env.TOKEN)
