terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = "my-access-key"
  secret_key = "my-secret-key"
}

# Instancia EC2 para el frontend y backend
resource "aws_instance" "app_server" {
  ami                    = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2 AMI (HVM)
  instance_type          = "t2.micro"
  associate_public_ip_address = true

  tags = {
    Name = "AppServer"
  }
}

# RDS MySQL
resource "aws_db_instance" "mysql" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t2.micro"
  db_name                 = "mydb"
  username             = "admin"
  password             = "my-rds-password"
  publicly_accessible  = true
  skip_final_snapshot  = true
}

# Salidas
output "app_server_public_ip" {
  value = aws_instance.app_server.public_ip
}

output "rds_endpoint" {
  value = aws_db_instance.mysql.endpoint
}
