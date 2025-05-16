<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users Posts App</title>
    <style>
        .App {
            text-align: center;
            font-family: Arial, sans-serif;
        }

        .App-header {
            background-color: #282c34;
            min-height: 20vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: calc(10px + 2vmin);
            color: white;
            padding: 20px;
            margin-bottom: 30px;
        }

        .container {
            display: flex;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .users-list {
            width: 30%;
            padding-right: 20px;
        }

        .user-item {
            background: white;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 10px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }

        .user-item:hover {
            background-color: #61dafb;
            color: #282c34;
            transform: translateX(5px);
        }

        .posts-container {
            width: 70%;
        }

        .post-card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            padding: 20px;
            text-align: left;
        }

        .post-title {
            font-size: 1.2em;
            margin-bottom: 10px;
            color: #282c34;
            font-weight: bold;
        }

        .post-body {
            color: #666;
            line-height: 1.5;
        }

        .no-posts {
            color: #666;
            font-style: italic;
        }

        @media (max-width: 768px) {
            .container {
                flex-direction: column;
            }
            
            .users-list, .posts-container {
                width: 100%;
                padding-right: 0;
            }
            
            .users-list {
                margin-bottom: 30px;
            }
        }
    </style>
</head>
