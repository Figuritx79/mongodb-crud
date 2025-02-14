import express, { Router } from 'express';

const app = express();

const PORT = process.env.PORT ?? 8000;

app.get('/up' , ((req,res)=> {
	return res.json({
		status: 'up'
	})
}))

app.listen(PORT, () => {
	console.log(`APP RUNNING ON PORT ${PORT}`);
});
