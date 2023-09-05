import type {APIRoute} from "astro";

export const POST: APIRoute = async ({request, locals}) => {
    const apiKey = import.meta.env.RESEND_API_KEY

    const uuid = crypto.randomUUID()

    const data = await request.json();

    if (!validateEmail(data.email)) {
        const msg = JSON.stringify({message: "Invalid email provided"})
        return new Response(msg, {status: 400, headers: {'Content-Type': 'application/json'}})
    }

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'X-Entity-Ref-ID': uuid,
        },
        body: JSON.stringify({
            from: 'Hello <hello@gemss.xyz>',
            to: [data.email],
            subject: 'Hello from Gemss',
            html: EmailTemplate(),
        }),
    });

    if (response.status !== 200) {
        const msg = JSON.stringify({message: "Something went wrong"})
        return new Response(msg, {status: 500, headers: {'Content-Type': 'application/json'}})
    }

    const msg = JSON.stringify({message: "Email sent"})

    return new Response(msg, {status: 200, headers: {'Content-Type': 'application/json'}})
}

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}


const EmailTemplate = () => {
    return `<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <style>
        img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%;
        }

        body {
            background-color: #000000 !important;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            min-height: 100vh !important;
            height: 100vh !important;
            width: 100% !important;
        }

        .body {
            background-color: #f6f6f6;
            width: 100%;
        }

        * {
            box-sizing: border-box;
        }

        p, a {
            font-size: 28px;
            line-height: 36px;
            color: #ffffff;
            font-weight: normal;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            max-width: 400px;
            padding: 0;
            margin: 0;
        }

        a {
            text-decoration: underline;
            text-underline: white;
        }


        @media only screen and (max-width: 480px) {
            p, a {
                font-size: 20px !important; /* or whatever size you want */
                line-height: 28px !important; /* or whatever size you want */
                max-width: 280px !important;
            }
            
            body {
                min-height: 820px !important;
            }
        }


    </style>
</head>
<body>
<div style="background-color: #000000; padding: 20px;">
    <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td valign="top">
                <img src="https://gemss.xyz/gem.png" alt="GEMSS" width="21" height="20">
                <p style="color: #ffffff; margin-top: 25px; max-width: 400px">
                    Thank you for leaving your message to Gemms. We will contact you on the next business day. If it’s
                    urgent,
                    contact us via <a href="tg://nickaxel">Telegram</a>,
                    <a href="https://twitter.com/gemsscollective">Twitter</a>, or
                    <a href="https://instagram.com/gemsscollective/">Instagram.</a>
                </p>
            </td>
        </tr>
        <tr>
            <td valign="bottom">
                <img src="https://gemss.xyz/heart.png" alt="love" width="27" height="24">
                <p style="margin-top: 16px;">
                    Sincerely, Nikita,
                    <br>
                    Founder of Gemss
                </p>
            </td>
        </tr>
    </table>
</div>
</body>
</html>
`
}