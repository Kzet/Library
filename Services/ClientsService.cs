using Core.Interfaces;
using Core.Models;
using Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ClientsService: IClientsService
    {
        private readonly Context _db;
        public ClientsService(Context db) {
            _db = db;
        }

        public async Task<List<Client>> GetClients()
        {
            var clients = await _db.Clients.AsNoTracking().ToListAsync();
            return clients;
        }

        public async Task<List<Client>> GetClientsByDebt(bool isDebtor)
        {
            List<Client?> clients;
            if (isDebtor)
            {
                clients = await _db.Clients
                .Include(_ => _.Books).Where(_ => _.Books.Count() > 0 && _.Books.Any(b => b.DateReturn < DateTime.Now)).AsNoTracking().ToListAsync();
            }
            else
            {
                clients = await _db.Clients
                .Include(_ => _.Books)
                .Where(_ => _.Books.Count() > 0 && _.Books.All(b => b.DateReturn >= DateTime.Now) || _.Books.Count() == 0)
                .AsNoTracking().ToListAsync();
            }

            return clients;
        }

        public async Task<Client> RegisterClient(Client client)
        {
            try
            {
                var clients = await _db.Clients.Where(_ => _.Email == client.Email).AsNoTracking().ToArrayAsync();
                if (clients.Any())
                {
                    throw new Exception("Клиент уже существует");
                }
                var res = await _db.Clients.AddAsync(client);
                await _db.SaveChangesAsync();
                return res.Entity;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
           
        }
    }
}
